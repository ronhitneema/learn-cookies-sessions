# Cookies and Sessions

## Cookies

Run `npm install`.

1. Run the cookies/insecure.js using Node. Load localhost:8000/home in your browser.
2. Navigate to localhost:8000/start?id=stacy. You should see the cookies being set in the browser's console.
3. Navigate to localhost:8000/home. You should see a different message from 1.
4. Run the cookies/mal.js using Node and load localhost:8001/malhome in your browser in a different tab.
5. Navigate to localhost:8000/home. You should see the same message as 1. Not the cookie value.

Why did this happen? Repeat the experiment with cookies/secure.js and see if the same thing happens.

Ans:

Experiment with cookies/insecure.js
Why the same message appears again in step 5:
The script cookies/insecure.js sets a cookie without the httpOnly flag, making it accessible to client-side JavaScript.
When you load localhost:8001/malhome running cookies/mal.js, it modifies this cookie (sets user to 'NA') through client-side scripting.
Returning to localhost:8000/home, the server reads the modified cookie, which now fails the check (uname === username), so it displays the message as if you are not logged in.

Experiment with cookies/secure.js
Expected Outcome:
The cookies/secure.js sets the 'user' cookie with the httpOnly flag, preventing client-side scripts from accessing or modifying it.
When you repeat the experiment, the malicious script (cookies/mal.js) should not be able to change the cookie.
Therefore, navigating back to localhost:8000/home should show the logged-in message, indicating that the user is still recognized as 'stacy'.


## Sessions

Run `npm install`

1. Run the sessions/insecure.js using Node. Load localhost:8000/ in your browser.
2. Enter name and click submit. You will see a session being created and stored in a cookie. See the console.
3. Run the sessions/mal.js using Node. Load localhost:8001/malhome in your browser. Will the session ID be displayed in the console?
4. Explore the code in sessions/insecure.js. Identify all potential vulnerabilities.


Ans:
Experiment with sessions/insecure.js

Session ID displayed in the console in step 3:

If sessions/insecure.js does not set the httpOnly flag on the session cookie, the session ID might be accessible to client-side scripts.
Therefore, sessions/mal.js could potentially access and log the session ID, indicating a security vulnerability.

Potential vulnerabilities in sessions/insecure.js:

The session secret is simple and predictable ("SOMESECRET"). It should be a complex, unique string.
The session cookie lacks security flags like httpOnly or secure. The httpOnly flag should be set to true.
There is no CSRF protection for the form submissions.

## Static Analysis

1. Setup CodeQL for this repository and inspect the report.
2. [CSRF tokens](https://www.npmjs.com/package/lusca).

Ans:
Setting up CodeQL:

CodeQL is a semantic code analysis engine that can be integrated into GitHub repository via GitHub Actions.
To set it up, you need to add a CodeQL analysis workflow in your repository's .github/workflows directory. GitHub provides templates for this.

Once set up, CodeQL will analyze your codebase for security vulnerabilities, code quality issues, and more.
Implementing CSRF tokens:

To implement CSRF tokens, use packages like lusca.
Each form or session should have a unique CSRF token.

The server should validate this token upon form submission to ensure the request originates from your application, not an external source.

This is crucial for preventing Cross-Site Request Forgery attacks.



