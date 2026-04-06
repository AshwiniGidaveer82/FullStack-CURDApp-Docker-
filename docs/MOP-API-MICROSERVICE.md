# MOP: API Microservice/Resource (Node.js/Express/Mongoose)

You are scaffolding a new HTTP API **resource** or **microservice** using Node.js/Express/TypeScript + Mongoose (MongoDB). Follow steps in order. Match existing `backend/src` layout from `book` example.

## Inputs

- **Resource** (singular Pascal, e.g. `User`)
- **plural** (lowercase, e.g. `users`)
- **Fields** (name:type required/optional, e.g. `name:String required, email:String required`)
- **Mode**: `integrated` (add to existing backend like book) or `microservice` (new standalone backend-{plural})

## Checklist for Integrated Resource (default)

1. **Model**: `backend/src/models/{Resource}.model.ts`

   ```
   import mongoose from 'mongoose';
   const {Resource}Schema = new mongoose.Schema({ [fields w/ required] }, { timestamps: true });
   export default mongoose.model('{Resource}', {Resource}Schema);
   ```

2. **Controller**: `backend/src/controllers/{Resource}.controller.ts`
   Copy `book.controller.ts`: async CRUD (create req.body, get paginated query.page/limit/skip, update findByIdAndUpdate new:true, delete findByIdAndDelete).
3. **Routes**: `backend/src/routes/{Resource}.routes.ts`

   ```
   import { Router } from 'express';
   import * as ctrl from '../controllers/{Resource}.controller';
   const router = Router();
   router.post('/', ctrl.create{Resource});
   router.get('/', ctrl.get{Resource}s);
   router.put('/:id', ctrl.update{Resource});
   router.delete('/:id', ctrl.delete{Resource});
   export default router;
   ```

4. **Registration**: Edit `backend/src/app.ts`: `app.use(`/{plural}`, {Resource}Routes);`
5. **Frontend Service** (optional): `frontend/src/app/services/{Resource}.service.ts`
   Copy `book.service.ts`, replace with `{plural}`, methods get{Resource}s(page,limit), create, update(id), delete(id).

## Microservice Mode

6. **New Backend**: Copy `backend/` to `backend-{plural}/`, replace `book` → `{Resource}`, update `app.ts` mount only this router if pure microservice, `server.ts` port = 3XXX (increment).
2. **Docker**: Copy `backend/Dockerfile` to `backend-{plural}/Dockerfile`.
3. **docker-compose.yml**: Add service `{plural}`: copy backend service, ports, volumes.
4. **K8s**: Copy backend-*.yaml to `{plural}-deployment.yaml`, `{plural}-service.yaml`, update names/ports.
5. **Frontend**: If Angular service, add apiUrl per service or proxy.

## Quality

- Async controllers match book.
- Pagination in GET.
- No unrelated changes.
- List changed files, example curl calls (POST /users {json}).

After, run `npm i` backend, `npm run dev`.
