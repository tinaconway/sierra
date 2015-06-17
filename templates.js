var templates = {};

templates.head = [
  "<div class = 'templateWrapper' data-id='<%=_id%>' rel= '<%= chipTotal %>'>",
  "<h1 id='user' name = '<%=username %>'> Welcome ",
  "<%= username %></h1>",
  "<h4>your chip total is: <%= chipTotal %> </h4>",
  "</div>"
].join("")

// templates.main = [
//   "div class = 'templateWrapperMain' data-id='<%=_id%'>",
//   "<h3><%= username %>",
//   "has sent ",
//   "<%= chipBet %>",
//   "to <%= recepient =>",
//   "</div>"
// ].join("")


templates.dropDown = [
  "<div class = 'players' data-id='<%=_id%>'>",
  "<h6 class = 'users'><%= username %></h6></div>",
].join("")
