var templates = {};

templates.head = [
  "<div class = 'templateWrapper' data-id='<%=_id%>'>",
  "<h1>Welcome ",
  "<%= username %></h1>",
  "<h4>your chip total is: <%= chipTotal %> </h4>",
  "</div>"
].join("")

templates.challengeReport = [
  "<li class='feedPost'>",
    "<div class='fa fa-life-ring feedIcon'></div>",
    "<div class='feedTxt'><%= challenger => challenged <%= challengie => for <%= numberofChips => chips </div>",
    "<div class='moreButton'>more</div>",
  "</li>"
].join("")

templates.resultReport = [
  "<li class='feedPost'>",
    "<div class='fa fa-life-ring feedIcon'></div>",
    "<div class='feedTxt'><%= winner => won <%= numberofChips  => chips from <%= loser =></div>",
    "<div class='moreButton'>more</div>"
  "</li>"
].join("")

templates.challengeForm = [
  "<li class='toWho'>",
  "<div class='fa fa-user'></div>",
  "<input class='inputArea toWhoTxt' type='text' name='reciever' placeholder='to who?' />",
  "</li>",
  "<li class='forWhat'>",
  "<input class='inputArea' type='text' name='betComment' placeholder='for what?'/>",
  "</li>",
  "<li class='howMuch'>",
  "<input class='howMuchTxt inputArea' type='text' name='betAmount' placeholder='#' /><span class='chipTxt'> chips </span><i class='fa fa-plus-circle'></i>",
  "</li>"
].join("")

templates.moreInfo = [
  "<li class='backButton'>",
  "<i class='fa fa-chevron-circle-left'></i>",
  "</li>",
  "<li class='forWhatGiven'>",
  "<%= description =%>",
  "</li>",
  "<li class='completeButton'>",
  "complete",
  "</li>"
].join("")

templates.whoWon = [
  "<li class='backButton'>",
  "<i class='fa fa-chevron-circle-left'></i>",
  "</li>",
  "<li class='whoWonText'>",
  "who won?",
  "</li>"
  "<li class='userButtonBox'>",
  "<div class='userButton'>",
  "<%= challenger =>",
  "</div>",
  "<div class='userButton'>",
  "<%= challengie =>",
  "</div>",
  "</li>"
].join("")
