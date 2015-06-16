var templates = {};

templates.head = [
  "<div class = 'templateWrapper' data-id='<%=_id%>'>",
  "<h1>Welcome ",
  "<%= username %>. ",
  "Your Chip Total is: <%= chipTotal %> </h1>",
  "</div>"
].join("")
