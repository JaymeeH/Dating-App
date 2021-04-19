import react from "react";
import "./Match.css";

export function unMatch() {
  var displayProfile = 0;
  
  //mocks
  var activeMatch = "name1";
  var mockImage = "mock.jpg";
  var mockName = "name1";
  var mockGender = "Male";
  var mockBio = "Bio here";
  //function to be merged
  function unMatch() {
    //redoing to restapi after switch from sockets
    //take activeMatch info and send to server with intent to remove match
  }
  function profileViewer() {
    if (displayProfile === 0) {
      document.getElementById("profileViewer").style.display = "block";
      displayProfile = 1;
    } else if (displayProfile === 1) {
      document.getElementById("profileViewer").style.display = "none";
      displayProfile = 0;
    }
  }
  return (
    <div className="Main">
      <div className="Match">
        <button className="Profile" onClick={() => profileViewer()}>
          {activeMatch}
        </button>
        <button className="unMatch" onClick={() => unMatch()}>
          Unmatch
        </button>
        <div className="profileViewer" id="profileViewer">
          <img src={mockImage} alt = ""></img>
          <p>
            {mockName}
            <br></br>
            {mockGender}
            <br></br>
            {mockBio}
          </p>
        </div>
      </div>
    </div>
  );
}
