const xhr = new XMLHttpRequest();

// normally it will get response after sending request, but it takes  time to get response, that's why should use this:
xhr.addEventListener('load', () => {
  console.log(xhr.response);
})

// to create request
xhr.open('GET', 'https://supersimplebackend.dev/products/hgfghfj');
// to send request to the destination requested above
xhr.send();
