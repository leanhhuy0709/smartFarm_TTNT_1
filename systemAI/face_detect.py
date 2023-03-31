import cv2
import numpy as np
import dlib


detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('landmarks/shape_predictor_68_face_landmarks.dat')
face_detector = cv2.CascadeClassifier('haarcascades/haarcascade_frontalface_default.xml')



name_dict = {0: 'Minh-My-2013811', 1: 'Van-Hung-2013401', 2: 'Huy-Hoang-2013219', 3: 'Anh-Huy-2013293'}
cap = cv2.VideoCapture(0)
while True:
    ret, frame = cap.read()
    # frame = cv2.resize(frame)
    if not ret:
        break
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    num_faces = face_detector.detectMultiScale(gray_frame, scaleFactor=1.3, minNeighbors=5)
    for (x, y, w, h) in num_faces:
        cv2.rectangle(frame, (x, y-50), (x + w, y + h + 10), (0, 255, 0), 4)
        cv2.putText(frame, name_dict[0], (x+5, y-20), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
        
    cv2.imshow('Face Detection', frame)

    if cv2.waitKey(1) & 0xFF == 27:
        break
cap.release()
cv2.destroyAllWindows()