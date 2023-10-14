FROM maven:3.8.2-adoptopenjdk-11

WORKDIR /gogo

COPY . /gogo

RUN mvn clean install

CMD [ "mvn","spring-boot:run" ]

