# New API service (FastAPI)

You are scaffolding a new HTTP API resource using **FastAPI** (Python). Follow the steps below in order. If `docs/MOP-API-MICROSERVICE.md` exists in the workspace, treat it as the source of truth and align every step with it; otherwise use this checklist and **match whatever FastAPI layout already exists** in the repo (folder names may differ).

## Inputs (from the user message)

- **Resource name** (singular, PascalCase for schemas): e.g. `Product`
- **URL prefix** (plural): e.g. `/api/products` or `/products`
- **Fields** for persistence (name, Python type, required vs optional)

If any of these are missing, ask one short clarifying question, then proceed with sensible defaults.

## Checklist

1. **Pydantic schemas** — Add request/response models (e.g. `*Create`, `*Update`, `*Read` or a single schema) under the project’s schemas package (common: `app/schemas/<resource>.py` or `schemas/<resource>.py`).
2. **Data layer** — Add or extend the ORM/document model the project uses (e.g. SQLAlchemy in `app/models/`, or Beanie/Mongo if that’s the stack). Align with existing base classes and session patterns.
3. **Router** — Add an `APIRouter` (e.g. `app/routers/<resource>.py`) with CRUD endpoints: list (with `skip`/`limit` or cursor if the app already does pagination), get by id, create, update, delete. Use `response_model`, correct status codes (`201` on create), and `HTTPException` for 404/validation errors consistent with the codebase.
4. **Registration** — Include the router in the FastAPI app (`main.py` or `app/main.py`): `app.include_router(..., prefix=..., tags=[...])`.
5. **DB session** — Use the project’s dependency-injected session/client (e.g. `get_db`); do not invent a new pattern unless the MOP requires it.
6. **Docker / env** — Change `docker-compose.yml` or settings only if the MOP or user requires a new service or new variables. Default: same app container and database as the rest of the API.
7. **Docs** — FastAPI exposes OpenAPI automatically; update `README.md` only if the repo already documents routes there.

## Quality bar

- Type hints, `async def` vs `def` must match how existing routes and DB calls are written.
- Do not refactor unrelated modules or other resources unless needed for shared utilities.
- After edits, list files changed and give example calls (method, path, sample JSON body). Mention that interactive docs live at `/docs` if the app uses default FastAPI settings.
