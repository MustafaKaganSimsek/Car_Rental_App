FROM maven:3.8.2-adoptopenjdk-11

COPY . .

RUN mvn clean install

CMD [ "mvn","spring-boot:run" ]

