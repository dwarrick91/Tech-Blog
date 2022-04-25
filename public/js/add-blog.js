async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
 
  const response = await fetch(`/`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      description,
     
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

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
