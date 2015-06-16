var array = [];

//TINA
// var date = new Date();
// var lastClickedMS = date.setDate(1);



$(document).ready (function() {
  page.init();
});



var page = {

  accountUrl: 'http://tiy-fee-rest.herokuapp.com/collections/chips12345',

  init: function() {
    page.getAccounts();
    page.initEvents();
  },

  initStyles: function () {
  },

  initEvents: function() {

    $('.signUpWrap').on('click', "#signUpButton", function(event) {
      event.preventDefault();
      var inputUserName = $('input[name="user"]').val();
      var inputPassword = $('input[name="pass"]').val();
      if(_.contains(array, inputUserName) !== true && inputPassword.length >= 6) {
          page.addAccount();
          page.getAccounts();
        } else {
          alert("Account already taken");
        }
    });

    $('.signUpWrap').on('click', "#logInButton", function(event) {
      event.preventDefault();
      page.loadAccount();  // insert function to add name & chip total to page;
    });

    function plural(s, i) {
      return i + ' ' + (i > 1 ? s + 's' : s);
    };
    function sundayDelta(offset) {
      // offset is in hours, so convert to miliseconds
      offset = offset ? offset * 60 * 60 * 1000 : 0;
      var now = new Date(new Date().getTime() + offset);
      var days = 7 - now.getDay() || 7;
      return [plural('day', days)].join(' ');
    };
    // Save reference to the DIV
    $refresh = $('#refresh');
    $refresh.text('Chips will refresh in ' + sundayDelta());
    // Update DIV contents every second
    setInterval(function() {
      $refresh.text('Chips will refresh in ' + sundayDelta());
      }
    }, 1000);
    
  },

  //////////////////////
  // AJAX & FUNCTIONS //
  //////////////////////

      ///////////////////////
      // ACCOUNT FUNCTIONS //
      ///////////////////////

  addAccountToDOM: function (post) {
    page.loadAccountToPage("head", post, $('.headBox')); // insert where to load template in the end of input
  },                                                          // 1st input = template name
                                                              // post input is the data coming from

  addAccount: function (event) {
    var newAccount = {
        username: $('input[name="user"]').val(),
        password: $('input[name="pass"]').val(),
        chipTotal: 0,
        lastClicked: ""
      };
    page.createAccount(newAccount);
    $('input[name="user"]').val("");
    $('input[name="pass"]').val("")
  },

  createAccount: function (newAccount) {
    $.ajax({
      url: page.accountUrl,
      method: 'POST',
      data: newAccount,
      success: function (data) {
        console.log("success!!: added accounts", data);
      },
      error: function (err) {
        console.log("error ", err);
      }
    });

  },

  loadAccount: function(event) {
    $.ajax({
      url: page.accountUrl,
      method: 'GET',
      success: function (data) {
        page.addAccountToDOM(data);
        $('input[name="user"]').val("");
        $('input[name="pass"]').val("");
      },
      error: function (err) {

      }
    });
  },

  loadAccountToPage: function (tmplName, data, $target) {
    var compiledTmpl = _.template(page.getTmpl(tmplName));
    _.each(data, function (el){
      if ($('#userNameInput').val() === el.username && $('#passwordInput').val() === el.password){
      $target.html(compiledTmpl(el));
      $('.pageWrapper').addClass('hidden');
      $('.mainWrapper').removeClass('hidden');
    }
    });
  },

  getAccounts: function(event) {
    $.ajax({
      url: page.accountUrl,
      method: 'GET',
      success: function (data) {
        accountData = data;
        array = [];
        _.each(accountData, function(el){
              array.push(el.username);
            });
      },
      error: function (err) {

      }
    });
  },

    getTmpl: function (name) {
    return templates[name];

  }


};
