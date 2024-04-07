# Endoints: /auth/

<details>
	<summary>
		<code>POST</code>
		<code><b>/auth/register</b></code>
		<code>(xxxxxxxxxxxxxxxxxxxx)</code>
	</summary>

#### body

> ```javascript
> 	{
> 		username,
> 		email,
> 		password,
> 		firstname,
> 		lastname,
> 		gender,
> 		loveM,
> 		loveF,
> 		loveNB,
> 		birthday,
> 		biography,
> 	}
>
> ```
>
> ```
>
> ```

#### SuccessResponse

> ```javascript
> 	user{
> 		id,
> 		email,
> 		access_token,
> 		username,
> 		lastname,
> 		gender,
> 		love_m,
> 		love_f,
> 		love_nb,
> 		latitude,
> 		longitude,
> 		city,
> 		fame,
> 	}
> ```

---

</details>

<details>
	<summary>
		<code>POST</code>
		<code><b>/auth/login</b></code>
		<code>(xxxxxxxxxxxxxxxxxxxx)</code>
	</summary>

#### body

> | name            | data type | type     | description |
> | --------------- | --------- | -------- | ----------- |
> | emailOrUsername | string    | required | N/A         |
> | password        | string    | required | N/A         |

#### SuccessResponse

> ```javascript
> 	user{
> 		id,
> 		email,
> 		access_token,
> 		username,
> 		lastname,
> 		gender,
> 		love_m,
> 		love_f,
> 		love_nb,
> 		latitude,
> 		longitude,
> 		city,
> 		fame,
> 	}
> ```

#### TODO

> -   envoyer tous les tags et les userTags

---
