# API Microservice Generator Slash Command TODO

## Steps from Plan (approved)

### 1. [x] Create docs/MOP-API-MICROSERVICE.md

- Document exact Node.js/Express/Mongoose pattern from book resource.
- Add microservice extensions: separate folder, port, Docker, K8s, docker-compose service.

### 2. [x] Create .cursor/commands/new-api-microservice.md

- Slash command template: Inputs (Resource singular PascalCase, plural lowercase, fields).
- Checklist: Generate model/controller/routes/app.ts/server.ts for new resource.
- Mount if integrated, or new folder/Docker/K8s if microservice.
- Optional Angular service.

### 3. [ ] Test command in Cursor IDE

- Run `/new-api-microservice User "name:String required, email:String required"`
- Verify generated files.

### 4. [x] Update README.md with command usage

- Add section on new slash commands.

### 5. [ ] [Optional] Generate example microservice (e.g., user-service)
