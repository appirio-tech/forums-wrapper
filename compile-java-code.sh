#!/bin/bash -e

CURRENTPWD=${PWD}
CLASSPATH=${PWD}/build/lib/commons-logging-1.1.3.jar
CLASSPATH=${CLASSPATH}:${PWD}/build/lib/forum-services.jar
CLASSPATH=${CLASSPATH}:${PWD}/build/lib/forums.jar
CLASSPATH=${CLASSPATH}:${PWD}/build/lib/gson-2.2.4.jar
CLASSPATH=${CLASSPATH}:${PWD}/build/lib/javax.ejb.jar
CLASSPATH=${CLASSPATH}:${PWD}/build/lib/jbossall-client.jar
CLASSPATH=${CLASSPATH}:${PWD}/build/lib/jivebase.jar
CLASSPATH=${CLASSPATH}:${PWD}/build/lib/jiveforums.jar

JAVA_VERSION=1.6
JAVAC_OPTS="-classpath ${CLASSPATH} -source ${JAVA_VERSION} -target ${JAVA_VERSION} -bootclasspath ${JAVA_HOME}/jre/lib/rt.jar"

cd ./src/com/topcoder/node/forum/
javac ${JAVAC_OPTS} *.java

cd ${CURRENTPWD}/src
jar cf ../build/lib/forum-wrapper.jar .
