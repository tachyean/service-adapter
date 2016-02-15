# Micro Service Adapter
Micro Service Adapter - stream transform protocol for node.js

Look at test.js

```
HTTP Server          DB Server
-----------          ---------
  adapter  <--------> adapter
     ^                  ^
     |     Log Server   |
     |     ----------   |
     ----->  adapter <---
```