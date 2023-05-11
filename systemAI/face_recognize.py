import face_recognition
import cv2
import numpy as np
import os
from datetime import datetime
import mysql.connector

cnx = mysql.connector.connect(user = 'root', password = '', 
                              host = '127.0.0.1', port = '3306',
                              database = 'smartfarmdb',auth_plugin='mysql_native_password')
cursor = cnx.cursor()


video_capture = cv2.VideoCapture(0)

known_face_encodings = []
known_face_names = []

datapath = "images"
knownfaces = os.listdir(datapath)

for face in knownfaces:
    img = face_recognition.load_image_file(os.path.join(datapath, face))
    img_location = face_recognition.face_locations(img)
    img_encoding = face_recognition.face_encodings(img,img_location)[0]
    
    known_face_encodings.append(img_encoding)
    known_face_names.append(face[:-4].upper())


# Initialize some variables
face_locations = []
face_encodings = []
rec_names = []
process_this_frame = True
face_frames = 0
print("Please put your face in front of the camera and hang on a moment...")
while True:
    # Grab a single frame of video
    if face_frames == 5:
        now  = datetime.now()
        current_time = now.strftime("%Y-%m-%d %H:%M:%S")
        face_result = max(set(rec_names), key = rec_names.count)
        # print(face_result)
        if face_result == "UNKNOWN":
            try:
                query = "INSERT INTO `access_history` VALUES ('" + str(current_time) + "')"
                cursor.execute(query)
                cnx.commit()
            except KeyError as e:
                print(e)
            
            print("Failure Recognition")
            break

        path_face_img = "images/" + str(face_result.lower()) + ".jpg"
        print(path_face_img)
        try:
            query = "SELECT `user`.`userID` FROM `user`,`faceImage` WHERE `user`.`userID` = `faceImage`.`userID` AND `faceImage`.`linkref` = '"+ str(path_face_img) + "'"
            cursor.execute(query)
            userid = cursor.fetchall()

            try:
                query = "INSERT INTO `access_history`(`datetime`) VALUES('" + str(current_time) + "')"
                cursor.execute(query)
                cnx.commit()
            except KeyError as e:
                print(e)
            
            try:
                query = "INSERT INTO `enter_farm`(`userid`,`datetime`) VALUES(%s,'" + str(current_time) + "')"
                cursor.execute(query, (userid[0]))
                cnx.commit()
            except KeyError as e:
                print(e)
            
        
        except KeyError as e:
            print(e)

        message_result = "Failure Recognition" if face_result == "UNKNOWN" else "Successful Identification"
        print(message_result) 

        break
    ret, frame = video_capture.read()
    frame = cv2.flip(frame, 1)
    # Only process every other frame of video to save time
    if process_this_frame:

        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = small_frame[:, :, ::-1]
        
        # Find all the faces and face encodings in the current frame of video
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        face_names = []
        for face_encoding in face_encodings:
            # See if the face is a match for the known face(s)
            face_frames += 1
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding, tolerance=0.4)
            name = "Unknown".upper()
            
            # print(matches)

            # Use the known face with the smallest distance to the new face
            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            # print(face_distances)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index] == True:
                name = known_face_names[best_match_index]

            face_names.append(name)
            rec_names.append(name)

    process_this_frame = not process_this_frame


    # Display the results
    for (top, right, bottom, left), name in zip(face_locations, face_names):
        # Scale back up face locations since the frame we detected in was scaled to 1/4 size
        top *= 4
        right *= 4
        bottom *= 4
        left *= 4

        # Draw a box around the face
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

        # Draw a label with a name below the face
        cv2.rectangle(frame, (left, top + 35), (right, top), (0, 0, 255))#, cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 10, top + 25), font, 1.0, (255, 255, 255), 1)

    # Display the resulting image
    cv2.imshow('Video', frame)

    # Hit 'q' on the keyboard to quit!
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release handle to the webcam
video_capture.release()
cv2.destroyAllWindows()

cursor.close()
cnx.close()