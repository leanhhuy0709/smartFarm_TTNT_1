import cv2
import numpy as np
import dlib
import os


# detector = dlib.get_frontal_face_detector()
# predictor = dlib.shape_predictor('landmarks/shape_predictor_68_face_landmarks.dat')
face_detector = cv2.CascadeClassifier('haarcascades/haarcascade_frontalface_default.xml')

cap = cv2.VideoCapture(0)

face_id = input('\n Enter your ID: ')
face_name = input('\n Enter your name: ')
dir = face_name
path = os.path.join('datasets', dir)
os.makedirs(path)   
print("Directory %s is created" % dir) 

# des_num = int(input('\n Enter a desired number of image created (>0): '))
imgs_count = 0
while True:
    ret, frame = cap.read()
    frame = cv2.resize(frame, (1280,720))
    # frame = cv2.flip(frame,1)
    if not ret:
        break
    
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_detector.detectMultiScale(gray_frame, scaleFactor=1.3, minNeighbors=5)
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y-50), (x + w, y + h + 10), (0, 255, 0), 4)
        # cv2.putText(frame, name_dict[0], (x+5, y-20), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
        face_img = gray_frame[y:y+h+10, x:x+w]
        face_img = cv2.resize(face_img,(400,500))
        cv2.imwrite("datasets/"+ str(dir) + '/' + str(face_name) + '.' + str(face_id) + '.' + str(imgs_count) + ".jpg", face_img)
        imgs_count +=1
        cv2.putText(frame, 'Detected Face', (x+5, y-20), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, 
                    (255, 0, 0), 2, cv2.LINE_AA)
        print(imgs_count)
    cv2.imshow('image', frame)
    

    if cv2.waitKey(100) & 0xFF == 27 or imgs_count >= 100:
        break

print("\n [INFO] Exiting Program and cleanup stuff")
cap.release()
cv2.destroyAllWindows()