שלום בודק יקר!
כמה נקודות חשובות לגבי העבודה

- In this project I chose to use mongoose.shcema and npm validator for validation, (not with joi)

- כמובן שהכל עובד כתיקונו , הקוד יותר קרי לדעתי וכמו שתראה בעצמך, בכל אופן הכנתי סכמה אחת לדוגמה אם הייתי משתמש בג'וי זה נמצא במודלס

- i used Eslint for better coding structure, also with Prettier.

- בקונטרולרס" תמצא אם כל האנד-פוינטס ע"פ נושאים "

---

ניתובים על פי המשימות:

- end point 1: POST
  http://localhost:7800/api/users/signup

* שים לב שצריך לשלוח גם אימות סיסמה !! --

- דוגמה למבנה בג'ייסון
  {
  "name":"test",
  "email":"test@gmail.com",
  "password":"1234abcd",
  "confirmPassword":"1234abcd"
  }

- end point 2: POST
  http://localhost:7800/api/users/login

- end point 3: GET - getting id from decoded token
  http://localhost:7800/api/users/me

- end point 4: POST
  http://localhost:7800/api/cards

* מבנה הכרטיס בג'יסון

  {
  "bName":"The Boring company",
  "bDiscription": "losrem impsum",
  "bAdress": "tel-aviv",
  "bPhone": "0231432312",
  "bPhoto": "fake/path"
  }

- end point 5: GET - using params
  http://localhost:7800/api/cards/:id

- end point 6 : PUT -using params
  http://localhost:7800/api/cards/:id

- end point 7 : DELETE - using params

http://localhost:7800/api/cards/:id

- end point 8 : GET - getting id from decoded token

http://localhost:7800/api/cards/my
