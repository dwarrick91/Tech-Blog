async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const description = document.querySelector('#description').value.trim();
 
  const response = await fetch(`/api/blogs`, {
    method: 'POST',
    body: JSON.stringify({
      title:title,
      description:description,
     
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);
  if (response.ok) {
    document.location.replace('/dashboard');
    console.log(response);
  } else {
  
    alert('Failed to add blog');
  }
}

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);
