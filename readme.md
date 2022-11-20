**Viết API theo hướng BDD trong nestjs**

Tương tự như viết theo hướng TDD.
[Xem tại đây](https://github.com/tuantyler/NestJS-TDD-Example)

Ta có 2 file test

test.feature

<img src="./myMediaFolder/media/image1.png"
style="width:6.5in;height:2.62778in" />

bdd.steps.ts

<img src="./myMediaFolder/media/image2.png"
style="width:6.5in;height:2.43889in" />

Ta sử dụng jest-cucumber để thực hiện viết test theo BDD

npm install jest-cucumber --save-dev

Vào package.json , tìm đến key testRegex , sửa từ regex từ dùng đuôi
spec sang steps

<img src="./myMediaFolder/media/image3.png"
style="width:5.56328in;height:3.7922in" />

Trong file bdd.test.steps.ts

Ta import hai thư viện của jest-cucumber

<img src="./myMediaFolder/media/image4.png"
style="width:6.3238in;height:0.32296in" />

Và load file feature để parse và chạy senario test

<img src="./myMediaFolder/media/image5.png"
style="width:5.1153in;height:0.32296in" />

Chạy npm để chạy test

<img src="./myMediaFolder/media/image6.png"
style="width:6.5in;height:2.15556in" />

Báo lỗi thiếu TodoModule

Chạy nest g module todo

<img src="./myMediaFolder/media/image7.png"
style="width:6.06335in;height:0.7501in" />

Chạy lại test, báo lỗi thiếu TodoEntity

<img src="./myMediaFolder/media/image8.png"
style="width:6.5in;height:2.12639in" />

Chạy nest g class todo/todo.entity

<img src="./myMediaFolder/media/image9.png"
style="width:6.5in;height:0.76806in" />

Chạy test, báo lỗi thiếu Controller

<img src="./myMediaFolder/media/image10.png"
style="width:6.5in;height:2.15556in" />

Chạy nest g controller todo

<img src="./myMediaFolder/media/image11.png"
style="width:6.46965in;height:0.92721in" />

Chạy test, báo lỗi thiếu thư viện typeorm

<img src="./myMediaFolder/media/image12.png"
style="width:6.5in;height:2.14167in" />

Chạy npm install --save @nestjs/typeorm typeorm mysql

Chạy test, báo lỗi thiếu sqllite

<img src="./myMediaFolder/media/image13.png"
style="width:6.5in;height:1.14236in" />

Chạy npm install better-sqlite3

Chạy test, báo lỗi thiếu context cho EntityRepository

<img src="./myMediaFolder/media/image14.png"
style="width:6.5in;height:1.21736in" />

Thêm context cho Entity

<img src="./myMediaFolder/media/image15.png"
style="width:6.5in;height:3.02569in" />

Chạy test, báo lỗi 404, routes chưa được defined trong controller

<img src="./myMediaFolder/media/image16.png"
style="width:6.5in;height:2.94167in" />

Define các route cần thiết và viết functions , sử dụng Repository để
thực hiện truy cập database

<img src="./myMediaFolder/media/image17.png"
style="width:6.5in;height:5.82431in" />

Chạy test, báo lỗi entity chưa được defined

<img src="./myMediaFolder/media/image18.png"
style="width:6.5in;height:0.88542in" />

<img src="./myMediaFolder/media/image19.png"
style="width:6.5in;height:1.47083in" />

Define Entity

<img src="./myMediaFolder/media/image20.png"
style="width:6.5in;height:2.91111in" />

Chạy lại test

<img src="./myMediaFolder/media/image21.png"
style="width:5.20906in;height:2.52119in" />
