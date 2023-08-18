FROM openjdk:11-jdk

ARG JAR_FILE=build/libs/withus-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} app.jar

EXPOSE 9001

ENTRYPOINT ["java","-jar", "/app.jar"]