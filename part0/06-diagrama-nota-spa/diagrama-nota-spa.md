## 0.6: Nueva nota en diagrama de aplicación de una sola pagina

```mermaid

sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: JSON document
    deactivate server
```