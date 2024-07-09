const xhr = new XMLHttpRequest();

// normally it will get response after sending request, but it takes  time to get response, that's why should use this:
xhr.addEventListener('load', () => {
  console.log(xhr.response);
})

// to create request
xhr.open('GET', 'https://supersimplebackend.dev/products/hgfghfj');
// to send request to the destination requested above
xhr.send();
//.send() is asynchronous, it mean when send request, it will not wait for the response to come back. =>> so to wait for the response, we should you addEventListener() like the above
