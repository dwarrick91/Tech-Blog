// var myModal = document.getElementById('myModal')
// var myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', function () {
//   myInput.focus()
// })

async function newCommentHandler(event) {
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
console.log({id});
    
  const description = document.querySelector('#commentDescription').value.trim();
 
  const response = await fetch(`/api/comments`, {
    method: 'POST',
    body: JSON.stringify({
      description:description,
      blog_id:id
     
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);
  if (response.ok) {
    document.location.replace(`/blog/${id}`);
    console.log(response);
  } else {
  console.log(response);
    alert('Failed to add comment');
  }
}

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);