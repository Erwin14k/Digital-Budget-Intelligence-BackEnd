
## Build
# docker build -t full-back:0.1.0 .

## Run
# 

FROM oraclelinux:8.6

# Oracle Client Install
# https://yum.oracle.com/oracle-instant-client.html
RUN  dnf install -y oracle-instantclient-release-el8
RUN  dnf install -y oracle-instantclient-basic
# Install Nodejs
RUN dnf install -y @nodejs:16

# Set Environment Variables
ENV SERVER_PORT="8500" \
    ORACLE_USER="oracledb" \
    ORACLE_PASS="adminpass" \
    ORACLE_CONNSTR="localhost:1521/orclpdb"

COPY . /opt/app
WORKDIR /opt/app

RUN npm install

CMD ["npm", "start"]