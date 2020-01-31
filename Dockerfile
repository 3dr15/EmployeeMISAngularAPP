FROM node:12.14 as builder
# FromMyMachine  DockerContainer
COPY . /EmpMisAngular
# DockerContainerWorkingDir
WORKDIR /EmpMisAngular
 
RUN npm install
# RUN $(npm bin)/ng build --base-href './'
RUN $(npm bin)/ng build --prod
 
# stage 2
FROM nginx as server
# builder to nginx Engine 
# COPY --from=builder /EmpMisAngular/dist/assets/ /etc/nginx/
COPY --from=builder /EmpMisAngular/dist/* /usr/share/nginx/html/
# COPY ./dist/assets/nginx.conf /etc/nginx/

 
EXPOSE 80