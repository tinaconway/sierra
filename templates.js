var templates = {};

templates.head = [
  "<div class = 'templateWrapper' data-id='<%=_id%>' rel= '<%= chipTotal %>'>",
  "<h1 id='user' name = '<%=username %>'> Welcome ",
  "<%= username %></h1>",
  "<h4>your chip total is: <span id='chipTotalHead'><%= chipTotal %> </h4>",
  "</div>"
].join("")

templates.challengeReport = [
  "<li class='feedPost'>",
    "<div class='fa fa-life-ring feedIcon'></div>",
    "<div class='feedTxt'><span id='init' name='<%=challenger%>' rel='<%=challengie%>' key='<%= chipTotal %>'></span><%= challenger %> challenged <%= challengie %> for <%= chipTotal %> chips </div>",
    "<div class='buttonWrapper'>",
      "<div class='moreButton' rel='<%=description%>'><i class='fa fa-gavel'></i></div>",
    "</div>",
  "</li>"
].join("")

templates.sendReport = [
  "<li class='feedPost'>",
    "<div class='fa fa-life-ring feedIcon'></div>",
    "<div class='feedTxt'><span id='init' name='<%=challenger%>' rel='<%=challengie%>'></span><%= challenger %> sent <%= challengie %> <%= chipTotal %> chips </div>",
    "<div class='buttonWrapper'>",
      "<div class='moreSendButton' rel='<%=description%>'><i class='fa fa-paper-plane'></i></div>",
    "</div>",
  "</li>"
].join("")

templates.resultReport = [
  "<li class='feedPost'>",
    "<div class='fa fa-life-ring feedIcon'></div>",
    "<div class='feedTxt'><%= winner %> won <%= numberofChips  %> chips from <%= loser %></div>",
    "<div class='moreButton'>more</div>",
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
    '<div class="description"></div>',
  "</li>",
  "<li class='completeButtons'>",
    '<div class="btn1"></div>',
    '<div class="btn2"></div>',
  "</li>"
].join("")

templates.dropDown = [
  "<div class = 'players' data-id='<%=_id%>'>",
  "<h6 class = 'users' data-id='<%=_id%>' id='<%= username %>' rel='<%=chipTotal%>'><%= username %></h6></div>"
].join("")
