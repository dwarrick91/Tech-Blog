async function editFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  
  
 
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  
  const response = await fetch(`/api/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      description,
      
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // What happens if the response is ok?
  // If the response is ok, that means that the dish was updated successfully. 
  if (response.ok) {
    document.location.replace(`/blog/${id}`);
  } else {
    alert('Failed to edit dish');
  }
}

document.querySelector('.edit-blog-form').addEventListener('submit', editFormHandler);
