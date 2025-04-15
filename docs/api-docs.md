---
title: pgmq-rest documentation v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - python: Python
  - ruby: Ruby
  - java: Java
  - go: Go
language_clients:
  - shell: ""
  - http: ""
  - javascript: ""
  - python: ""
  - ruby: ""
  - java: ""
  - go: ""
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="pgmq-rest-documentation">pgmq-rest documentation v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Development documentation

<h1 id="pgmq-rest-documentation-default">Default</h1>

## getIndex

<a id="opIdgetIndex"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /

```

```http
GET / HTTP/1.1

```

```javascript

fetch('/',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests

r = requests.get('/')

print(r.json())

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get '/',
  params: {
  }

p JSON.parse(result)

```

```java
URL obj = new URL("/");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /`

<h3 id="getindex-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="pgmq-rest-documentation-sending-messages">Sending Messages</h1>

## postApiV1Send

<a id="opIdpostApiV1Send"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /api/v1/send \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /api/v1/send HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "queue_name": "string",
  "msg": null,
  "delay": 0
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/v1/send',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/v1/send', headers = headers)

print(r.json())

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/api/v1/send',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```java
URL obj = new URL("/api/v1/send");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/v1/send", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/send`

> Body parameter

```json
{
  "queue_name": "string",
  "msg": null,
  "delay": 0
}
```

```
queue_name: string
msg: null
delay: 0

```

```yaml
queue_name: string
msg: null
delay: 0

```

<h3 id="postapiv1send-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» queue_name|body|string|true|none|
|» msg|body|any|true|none|
|» delay|body|any|false|none|
|»» *anonymous*|body|string(integer)|false|none|
|»» *anonymous*|body|integer|false|none|

> Example responses

> 200 Response

```json
[
  0
]
```

```
[0]
```

<h3 id="postapiv1send-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="postapiv1send-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## postApiV1Send_batch

<a id="opIdpostApiV1Send_batch"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /api/v1/send_batch \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /api/v1/send_batch HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "queue_name": "string",
  "msgs": [
    null
  ],
  "delay": 0
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/v1/send_batch',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/v1/send_batch', headers = headers)

print(r.json())

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/api/v1/send_batch',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```java
URL obj = new URL("/api/v1/send_batch");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/v1/send_batch", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/send_batch`

> Body parameter

```json
{
  "queue_name": "string",
  "msgs": [
    null
  ],
  "delay": 0
}
```

```
queue_name: string
msgs:
  - null
delay: 0

```

```yaml
queue_name: string
msgs:
  - null
delay: 0

```

<h3 id="postapiv1send_batch-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» queue_name|body|string|true|none|
|» msgs|body|[any]|true|none|
|» delay|body|any|false|none|
|»» *anonymous*|body|string(integer)|false|none|
|»» *anonymous*|body|integer|false|none|

> Example responses

> 200 Response

```json
[
  0
]
```

```
[0]
```

<h3 id="postapiv1send_batch-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="postapiv1send_batch-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="pgmq-rest-documentation-reading-messages">Reading Messages</h1>

## postApiV1Read

<a id="opIdpostApiV1Read"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /api/v1/read \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /api/v1/read HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "queue_name": "string",
  "vt": 0,
  "qty": 0,
  "conditional": null
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/v1/read',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/v1/read', headers = headers)

print(r.json())

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/api/v1/read',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```java
URL obj = new URL("/api/v1/read");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/v1/read", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/read`

> Body parameter

```json
{
  "queue_name": "string",
  "vt": 0,
  "qty": 0,
  "conditional": null
}
```

```
queue_name: string
vt: 0
qty: 0
conditional: null

```

```yaml
queue_name: string
vt: 0
qty: 0
conditional: null

```

<h3 id="postapiv1read-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» queue_name|body|string|true|none|
|» vt|body|any|true|none|
|»» *anonymous*|body|string(integer)|false|none|
|»» *anonymous*|body|integer|false|none|
|» qty|body|any|true|none|
|»» *anonymous*|body|string(integer)|false|none|
|»» *anonymous*|body|integer|false|none|
|» conditional|body|any|false|none|

> Example responses

> 200 Response

```json
[
  [
    0,
    0,
    {},
    {},
    null,
    null
  ]
]
```

```
[[0,0,{},{},null,null]]
```

<h3 id="postapiv1read-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="postapiv1read-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## postApiV1Read_with_poll

<a id="opIdpostApiV1Read_with_poll"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /api/v1/read_with_poll \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /api/v1/read_with_poll HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "queue_name": "string",
  "vt": 0,
  "qty": 0,
  "max_poll_seconds": 0,
  "poll_interval_ms": 0,
  "conditional": null
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/v1/read_with_poll',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/v1/read_with_poll', headers = headers)

print(r.json())

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/api/v1/read_with_poll',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```java
URL obj = new URL("/api/v1/read_with_poll");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/v1/read_with_poll", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/read_with_poll`

> Body parameter

```json
{
  "queue_name": "string",
  "vt": 0,
  "qty": 0,
  "max_poll_seconds": 0,
  "poll_interval_ms": 0,
  "conditional": null
}
```

```
queue_name: string
vt: 0
qty: 0
max_poll_seconds: 0
poll_interval_ms: 0
conditional: null

```

```yaml
queue_name: string
vt: 0
qty: 0
max_poll_seconds: 0
poll_interval_ms: 0
conditional: null

```

<h3 id="postapiv1read_with_poll-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» queue_name|body|string|true|none|
|» vt|body|any|true|none|
|»» *anonymous*|body|string(integer)|false|none|
|»» *anonymous*|body|integer|false|none|
|» qty|body|any|true|none|
|»» *anonymous*|body|string(integer)|false|none|
|»» *anonymous*|body|integer|false|none|
|» max_poll_seconds|body|any|false|none|
|»» *anonymous*|body|string(integer)|false|none|
|»» *anonymous*|body|integer|false|none|
|» poll_interval_ms|body|any|false|none|
|»» *anonymous*|body|string(integer)|false|none|
|»» *anonymous*|body|integer|false|none|
|» conditional|body|any|false|none|

> Example responses

> 200 Response

```json
[
  [
    0,
    0,
    {},
    {},
    null,
    null
  ]
]
```

```
[[0,0,{},{},null,null]]
```

<h3 id="postapiv1read_with_poll-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="postapiv1read_with_poll-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## postApiV1Pop

<a id="opIdpostApiV1Pop"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /api/v1/pop \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /api/v1/pop HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "queue_name": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/v1/pop',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/v1/pop', headers = headers)

print(r.json())

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/api/v1/pop',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```java
URL obj = new URL("/api/v1/pop");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/v1/pop", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/pop`

> Body parameter

```json
{
  "queue_name": "string"
}
```

```
queue_name: string

```

```yaml
queue_name: string

```

<h3 id="postapiv1pop-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» queue_name|body|string|true|none|

> Example responses

> 200 Response

```json
[
  [
    0,
    0,
    {},
    {},
    null,
    null
  ]
]
```

```
[[0,0,{},{},null,null]]
```

<h3 id="postapiv1pop-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="postapiv1pop-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="pgmq-rest-documentation-deleting-messages">Deleting Messages</h1>

## postApiV1Delete

<a id="opIdpostApiV1Delete"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /api/v1/delete \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /api/v1/delete HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "queue_name": "string",
  "msg_id": 0
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/v1/delete',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/v1/delete', headers = headers)

print(r.json())

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/api/v1/delete',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```java
URL obj = new URL("/api/v1/delete");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/v1/delete", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/delete`

> Body parameter

```json
{
  "queue_name": "string",
  "msg_id": 0
}
```

```
queue_name: string
msg_id: 0

```

```yaml
queue_name: string
msg_id: 0

```

<h3 id="postapiv1delete-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» queue_name|body|string|true|none|
|» msg_id|body|number|true|none|

> Example responses

> 200 Response

```json
true
```

```
true
```

<h3 id="postapiv1delete-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|boolean|

<aside class="success">
This operation does not require authentication
</aside>

## postApiV1Delete_batch

<a id="opIdpostApiV1Delete_batch"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /api/v1/delete_batch \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /api/v1/delete_batch HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "queue_name": "string",
  "msg_ids": [
    0
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/v1/delete_batch',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/v1/delete_batch', headers = headers)

print(r.json())

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/api/v1/delete_batch',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```java
URL obj = new URL("/api/v1/delete_batch");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/v1/delete_batch", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/delete_batch`

> Body parameter

```json
{
  "queue_name": "string",
  "msg_ids": [
    0
  ]
}
```

```
queue_name: string
msg_ids:
  - 0

```

```yaml
queue_name: string
msg_ids:
  - 0

```

<h3 id="postapiv1delete_batch-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» queue_name|body|string|true|none|
|» msg_ids|body|[number]|true|none|

> Example responses

> 200 Response

```json
[
  0
]
```

```
[0]
```

<h3 id="postapiv1delete_batch-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="postapiv1delete_batch-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## postApiV1Purge_queue

<a id="opIdpostApiV1Purge_queue"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /api/v1/purge_queue \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /api/v1/purge_queue HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "queue_name": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/v1/purge_queue',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/v1/purge_queue', headers = headers)

print(r.json())

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/api/v1/purge_queue',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```java
URL obj = new URL("/api/v1/purge_queue");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/v1/purge_queue", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/purge_queue`

> Body parameter

```json
{
  "queue_name": "string"
}
```

```
queue_name: string

```

```yaml
queue_name: string

```

<h3 id="postapiv1purge_queue-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» queue_name|body|string|true|none|

> Example responses

> 200 Response

```json
0
```

```
0
```

<h3 id="postapiv1purge_queue-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|number|

<aside class="success">
This operation does not require authentication
</aside>

## postApiV1Archive

<a id="opIdpostApiV1Archive"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /api/v1/archive \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /api/v1/archive HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "queue_name": "string",
  "msg_id": 0
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/v1/archive',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/v1/archive', headers = headers)

print(r.json())

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/api/v1/archive',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```java
URL obj = new URL("/api/v1/archive");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/v1/archive", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/archive`

> Body parameter

```json
{
  "queue_name": "string",
  "msg_id": 0
}
```

```
queue_name: string
msg_id: 0

```

```yaml
queue_name: string
msg_id: 0

```

<h3 id="postapiv1archive-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» queue_name|body|string|true|none|
|» msg_id|body|number|true|none|

> Example responses

> 200 Response

```json
true
```

```
true
```

<h3 id="postapiv1archive-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|boolean|

<aside class="success">
This operation does not require authentication
</aside>

## postApiV1Archive_batch

<a id="opIdpostApiV1Archive_batch"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /api/v1/archive_batch \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /api/v1/archive_batch HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "queue_name": "string",
  "msg_ids": [
    0
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/v1/archive_batch',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/v1/archive_batch', headers = headers)

print(r.json())

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/api/v1/archive_batch',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```java
URL obj = new URL("/api/v1/archive_batch");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/v1/archive_batch", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/archive_batch`

> Body parameter

```json
{
  "queue_name": "string",
  "msg_ids": [
    0
  ]
}
```

```
queue_name: string
msg_ids:
  - 0

```

```yaml
queue_name: string
msg_ids:
  - 0

```

<h3 id="postapiv1archive_batch-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» queue_name|body|string|true|none|
|» msg_ids|body|[number]|true|none|

> Example responses

> 200 Response

```json
[
  0
]
```

```
[0]
```

<h3 id="postapiv1archive_batch-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="postapiv1archive_batch-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="pgmq-rest-documentation-queue-management">Queue Management</h1>

## postApiV1Create

<a id="opIdpostApiV1Create"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /api/v1/create \
  -H 'Content-Type: application/json'

```

```http
POST /api/v1/create HTTP/1.1

Content-Type: application/json

```

```javascript
const inputBody = '{
  "queue_name": "string"
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/v1/create',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/v1/create', headers = headers)

print(r.json())

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.post '/api/v1/create',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```java
URL obj = new URL("/api/v1/create");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/v1/create", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/create`

> Body parameter

```json
{
  "queue_name": "string"
}
```

```
queue_name: string

```

```yaml
queue_name: string

```

<h3 id="postapiv1create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» queue_name|body|string|true|none|

<h3 id="postapiv1create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## postApiV1Create_unlogged

<a id="opIdpostApiV1Create_unlogged"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /api/v1/create_unlogged \
  -H 'Content-Type: application/json'

```

```http
POST /api/v1/create_unlogged HTTP/1.1

Content-Type: application/json

```

```javascript
const inputBody = '{
  "queue_name": "string"
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/v1/create_unlogged',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/v1/create_unlogged', headers = headers)

print(r.json())

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.post '/api/v1/create_unlogged',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```java
URL obj = new URL("/api/v1/create_unlogged");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/v1/create_unlogged", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/create_unlogged`

> Body parameter

```json
{
  "queue_name": "string"
}
```

```
queue_name: string

```

```yaml
queue_name: string

```

<h3 id="postapiv1create_unlogged-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» queue_name|body|string|true|none|

<h3 id="postapiv1create_unlogged-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## postApiV1Drop_queue

<a id="opIdpostApiV1Drop_queue"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /api/v1/drop_queue \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /api/v1/drop_queue HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "queue_name": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/v1/drop_queue',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/v1/drop_queue', headers = headers)

print(r.json())

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/api/v1/drop_queue',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```java
URL obj = new URL("/api/v1/drop_queue");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/v1/drop_queue", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/drop_queue`

> Body parameter

```json
{
  "queue_name": "string"
}
```

```
queue_name: string

```

```yaml
queue_name: string

```

<h3 id="postapiv1drop_queue-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» queue_name|body|string|true|none|

> Example responses

> 200 Response

```json
true
```

```
true
```

<h3 id="postapiv1drop_queue-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|boolean|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="pgmq-rest-documentation-utilities">Utilities</h1>

## postApiV1Set_vt

<a id="opIdpostApiV1Set_vt"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /api/v1/set_vt \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /api/v1/set_vt HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "queue_name": "string",
  "msg_id": 0,
  "vt_offset": 0
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/v1/set_vt',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/v1/set_vt', headers = headers)

print(r.json())

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/api/v1/set_vt',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```java
URL obj = new URL("/api/v1/set_vt");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/v1/set_vt", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/set_vt`

> Body parameter

```json
{
  "queue_name": "string",
  "msg_id": 0,
  "vt_offset": 0
}
```

```
queue_name: string
msg_id: 0
vt_offset: 0

```

```yaml
queue_name: string
msg_id: 0
vt_offset: 0

```

<h3 id="postapiv1set_vt-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» queue_name|body|string|true|none|
|» msg_id|body|number|true|none|
|» vt_offset|body|number|true|none|

> Example responses

> 200 Response

```json
[
  [
    0,
    0,
    {},
    {},
    null,
    null
  ]
]
```

```
[[0,0,{},{},null,null]]
```

<h3 id="postapiv1set_vt-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="postapiv1set_vt-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## postApiV1List_queues

<a id="opIdpostApiV1List_queues"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /api/v1/list_queues \
  -H 'Accept: application/json'

```

```http
POST /api/v1/list_queues HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/v1/list_queues',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.post('/api/v1/list_queues', headers = headers)

print(r.json())

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.post '/api/v1/list_queues',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```java
URL obj = new URL("/api/v1/list_queues");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/v1/list_queues", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/list_queues`

> Example responses

> 200 Response

```json
[
  [
    "string",
    true,
    true,
    {}
  ]
]
```

```
[["string",true,true,{}]]
```

<h3 id="postapiv1list_queues-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="postapiv1list_queues-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## postApiV1Metrics

<a id="opIdpostApiV1Metrics"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /api/v1/metrics \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /api/v1/metrics HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "queue_name": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/v1/metrics',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/v1/metrics', headers = headers)

print(r.json())

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/api/v1/metrics',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```java
URL obj = new URL("/api/v1/metrics");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/v1/metrics", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/metrics`

> Body parameter

```json
{
  "queue_name": "string"
}
```

```
queue_name: string

```

```yaml
queue_name: string

```

<h3 id="postapiv1metrics-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» queue_name|body|string|true|none|

> Example responses

> 200 Response

```json
[
  [
    "string",
    0,
    0,
    0,
    0,
    {}
  ]
]
```

```
[["string",0,0,0,0,{}]]
```

<h3 id="postapiv1metrics-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="postapiv1metrics-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## postApiV1Metrics_all

<a id="opIdpostApiV1Metrics_all"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /api/v1/metrics_all \
  -H 'Accept: application/json'

```

```http
POST /api/v1/metrics_all HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/v1/metrics_all',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.post('/api/v1/metrics_all', headers = headers)

print(r.json())

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.post '/api/v1/metrics_all',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```java
URL obj = new URL("/api/v1/metrics_all");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/v1/metrics_all", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/metrics_all`

> Example responses

> 200 Response

```json
[
  [
    "string",
    0,
    0,
    0,
    0,
    {}
  ]
]
```

```
[["string",0,0,0,0,{}]]
```

<h3 id="postapiv1metrics_all-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="postapiv1metrics_all-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

