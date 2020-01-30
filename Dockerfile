FROM node:12.14 as builder
# FromMyMachine  DockerContainer
COPY . /EmpMisAngular
# DockerContainerWorkingDir
WORKDIR /EmpMisAngular
 
RUN npm install
RUN $(npm bin)/ng build --base-href '/'
 
# stage 2
FROM nginx
# FromMyMachine nginx Engine 
COPY --from=builder /EmpMisAngular/dist/* /usr/share/nginx/html/
COPY --from=builder /EmpMisAngular/src/assets/* /usr/share/nginx/html/

 
EXPOSE 80