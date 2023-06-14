// delete a post in dashboard
document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-button');
  
    deleteButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.preventDefault();
  
        // Retrieve the post ID from the data attribute
        const postId = button.dataset.postId;
  
        // Confirm the deletion
        if (confirm('Are you sure you want to delete this post?')) {
          const url = `/posts/${postId}`;
  
          try {
            const response = await fetch(url, { method: 'DELETE' });
  
            if (response.ok) {
              // Refresh the page after successful deletion
              location.reload();
            } else {
              throw new Error('Error deleting post');
            }
          } catch (error) {
            console.error(error);
            alert('An error occurred while deleting the post');
          }
        }
      });
    });
  });

  // Update post
  document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.querySelectorAll('.edit-button');

    editButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();

        const postId = button.getAttribute('data-post-id');
        const editForm = document.getElementById(`edit-form-${postId}`);

        if (editForm && !editForm.querySelector('.cancel-button')) {
          const cancelButton = document.createElement('button');
          cancelButton.innerText = 'Cancel';
          cancelButton.classList.add('cancel-button');

          editForm.appendChild(cancelButton);
          button.style.display = 'none';
          editForm.style.display = 'block';

          cancelButton.addEventListener('click', () => {
            editForm.removeChild(cancelButton);
            button.style.display = 'inline';
            editForm.style.display = 'none';
          });
        }
      });
    });
  });

  // show add new post form
  function toggleAddNewPostForm() {
    const addNewPostForm = document.getElementById('addNewPostForm');
    const addNewPostButton = document.getElementById('addNewPostButton');

    if (addNewPostForm.style.display === 'none') {
      addNewPostForm.style.display = 'block';
      addNewPostButton.textContent = 'Hide Blog Post Form';
    } else {
      addNewPostForm.style.display = 'none';
      addNewPostButton.textContent = 'Show Blog Post Form';
    }
  }
