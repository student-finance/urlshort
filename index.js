addEventListener('fetch', event => {
  try {
    if (event.request.method.toUpperCase() === 'POST') return event.respondWith(handlePostRequest(event.request));
    if (event.request.method.toUpperCase() === 'GET') return event.respondWith(handleGETRequest(event.request));
    return event.respondWith(fetch(event.request));
  } catch (e) {
    return event.respondWith(new Response('Error thrown ' + e.message));
  }
});

function return404(msg = "Nothing here :)"){
  return new Response(
    `<!doctype html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <h1 >`+
      msg+
      `</h1>
    </body>
    </html>`,
      {
        status: 404,
        headers: { 'content-type': 'text/html' },
      },
    )
};

async function handleGETRequest(request) {
  const url = new URL(request.url);

  console.log(request.headers.get('user-agent'), new Date().toLocaleDateString(), url.pathname.substring(1));
  var split_url = url.pathname.split('/')
  if (split_url.length < 2 || split_url.length > 3 || split_url[1] == "favicon.ico" || split_url[1] == "") {
    return return404();
  }
  let path = split_url[1];
  const redirect_path = await URL_SHORT.get(path);
  if (redirect_path === null) {
    return return404();
  }
  return Response.redirect(redirect_path, 308);
}

async function handlePostRequest(request){
  const url = new URL(request.url);
  console.log(request.headers.get('user-agent'), new Date().toLocaleDateString(), url.pathname.substring(1));

  console.log(await request.text());

  return return404();
}