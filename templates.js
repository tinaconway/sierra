var templates = {};

templates.head = [
  "<div class = 'templateWrapper' data-id='<%=_id%>'>",
  "<h1 id='user'>Welcome ",
  "<%= username %></h1>",
  "<h4>your chip total is: <%= chipTotal %> </h4>",
  "</div>"
].join("")
