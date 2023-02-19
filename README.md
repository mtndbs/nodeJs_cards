# שלום בודק יקר!

## :כמה נקודות חשובות לגבי העבודה

- In this project I used "Eslint" for better coding structure, also with Prettier.

- In this project I chose to use pre(save) mongoose.shcema and npm Validator for validation, (not with joi)

* כמובן שהכל עובד כתיקונו , הקוד יותר קרי לדעתי וכמו שתראה בעצמך, בכל אופן הכנתי סכמה אחת לדוגמה אם הייתי משתמש בג'וי ,היא נמצאת במודלס

- בעבודה הוספתי עוד נקודות קצה ומודולים שלא התבקשו בעבודה כמו: איפוס סיסמה על ידי אימות דוא"ל, החלפת סיסמה, הגבלת בקשות, אבטחה ועוד דברים שיתוספו בהמשך "

---

- הכנתי לך את כל הניתובים ב"פוסט-מאן" ב"אי.פי.אי", נשאר לעשות רק "אימפורט" והחיים קלים

- https://api.postman.com/collections/24760583-2e4292f3-bf20-42d8-9be9-bc2134e5ad28?access_key=PMAT-01GS8FC6M1Z00Y93NKJCTD0DH2

---

## ניתובים על פי המשימות

- end point 1: POST
  http://localhost:7800/api/users/signup

* שים לב שצריך לשלוח גם אימות סיסמה !! --

* דוגמה למבנה בג'ייסון
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
