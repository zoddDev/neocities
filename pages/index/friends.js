function createFriend(friendImage, friendName) {
  return `<div class="friend">
  <div class="mini-parent">
    <div class="">
      <img class="mini-portrait image1 tinted" src="${friendImage}" />
      <img class="mini-portrait image2" src="/resources/images/gifs/purple_frame.gif" />
    </div>
    <div class="text-text text-center">
      <a href="">${friendName}</a>
    </div>
  </div>
</div>`;
}

fetch("/resources/data/friends.json")
  .then((response) => response.json())
  .then((friends) => {
    mountFriends(friends);
  });

function mountFriends(friends) {
  const container = document.getElementById("friends");
  friends.forEach((friend) => {
    const { name, image } = friend;
    const friendElement = document.createElement("div");
    friendElement.classList.add("friend");
    friendElement.innerHTML = createFriend(image, name);
    container.appendChild(friendElement);
  });
}
