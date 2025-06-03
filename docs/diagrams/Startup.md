# Diagrams - startup

This file represents simplified startup flow of this application.

Last update: 13.01.2025

```text
┌────────────┐       
│Start       │       
└┬──────────┬┘       
┌▽────────┐┌▽─────┐  
│Bootstrap││Router│  
└─────────┘└┬─────┘  
┌───────────▽───────┐
│"Wait for messages"│
└───────────────────┘
```

<details>
  <summary>Raw diagram</summary>

  Start -> Bootstrap
  Start -> Router -> "Wait for messages"

  Diagram made using Diagon 
</details>
