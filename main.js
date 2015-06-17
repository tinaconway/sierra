var array = [];
var accountData;
var endOfWeek;


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


    function plural(s, i) {
      return i + ' ' + (i > 1 ? s + 's' : s);
    }

    function sundayDelta(offset) {
      // offset is in hours, so convert to miliseconds
      offset = offset ? offset * 60 * 60 * 1000 : 0;
      var now = new Date(new Date().getTime() + offset);
      var days = 7 - now.getDay() || 7;
      var hours = 24 - now.getHours();
      var minutes = 60 - now.getMinutes();
      var seconds = 60 - now.getSeconds();
      if (days === 1 && hours === 1 && minutes === 1 && seconds === 1) {
        page.accountChangeTimer();
      };
      return [plural('day', days)].join(' ');
    }

    // Save reference to the DIV
    $refresh = $('#refresh');

    $refresh.text('Chips will refresh in ' + sundayDelta());

    // Update DIV contents every second
    setInterval(function() {
      $refresh.text('Chips will refresh in ' + sundayDelta());
    }, 1000);


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

    $('.dropdown-menu').on('click', ".users", function(event) {
      event.preventDefault();
      var userAdded = $(this).html();
      console.log("I'm working");
      console.log(userAdded);
      $('.toWhom').html(userAdded);
    });

    $('.profile').on('click', ".btn-lg", function(event) {
      event.preventDefault();
      console.log("I'm working!");
      $('.pageWrapper').removeClass('hidden');
      $('.mainWrapper').addClass('hidden');
    });

    $('.howMuch').on('click', "#sendChips", function(event) {
      event.preventDefault();
      console.log("I'm working!");
      var username = $('#user').attr('name');
      var id = $('.templateWrapper').data('id');
      var chipAmount = Number($('input[name="betAmount"]').val());
      var senderChipTotal = Number($('.templateWrapper').attr('rel'));
      page.removeChips(username, id, chipAmount, senderChipTotal);
    });


  },

  //////////////////////
  // CHALLENGE FUNCTIONS //
  //////////////////////




  //////////////////////
  // AJAX & FUNCTIONS //
  //////////////////////

      ///////////////////////
      // ACCOUNT FUNCTIONS //
      ///////////////////////

  getAccounts: function(event) {
    $.ajax({
        url: page.accountUrl,
        method: 'GET',
        success: function (data) {
          accountData = data;
        },
        error: function (err) {

        }
      });
    },

  addAccountToDOM: function (post) {
    page.loadAccountToPage("head", post, $('.headBox'));
    page.loadAccountToDropdown("dropDown", post, $('.dropdown-menu'));
  },

  addAccount: function (event) {
    var newAccount = {
        username: $('input[name="user"]').val(),
        password: $('input[name="pass"]').val(),
        chipTotal: 5
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

  loadAccountToDropdown: function (tmplName, data, $target) {
    var compiledTmpl = _.template(page.getTmpl(tmplName));
    _.each(data, function (el){
      var userNameDrop = el.username
      $target.append(compiledTmpl(el));
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

  },


    ////////////////////
    // CHIP FUNCTIONS //
    ////////////////////

  accountChangeTimer: function() {

      var updatedCount = {
        chipTotal: 5
      };

      page.chipRefresh(updatedCount);
      },

  chipRefresh: function (updatedCount) {

    _.each(accountData, function(el){
        var idlink = el._id;
        console.log(el._id);
      $.ajax({
        url: page.accountUrl + '/' + idlink,
        method: 'PUT',
        data: updatedCount,
        success: function (accountData) {
          console.log('Changing chip count');
        },
        error: function (err) {
        }
        })
    })

},


    ///////////////
    // CHIP FORM //
    ///////////////

  chipAdd: function (userAdd, id, chipAmount) {
    var accountId = id;
    var accountAdd = {
      username: userAdd,
      chipTotal: chipAmount
    };
    page.chipSend()
  },
  removeChips: function (userAdd, id, chipAmount, senderChipTotal) {
    var accountId = id;
    var chipCalculation;
    if (senderChipTotal - chipAmount >= 0 && $('input[name="betAmount"]').val() !== "") {
      chipCalculation = senderChipTotal - chipAmount;
    }
    else {
      alert("You don't have enough chips or you didn't enter a chip amount!")
    }
    console.log(chipCalculation);
    var accountAdd = {
      username: userAdd,
      chipTotal: chipCalculation.toString()
    };
    page.chipSend(accountAdd, accountId)
  },

  chipSend: function (accountAdd, accountId) {

      $.ajax({
        url: page.accountUrl + '/' + accountId,
        method: 'PUT',
        data: accountAdd,
        success: function (accountAdd) {
          console.log('removing Chips from account');
        },
        error: function (err) {
        }
      })
    }

};
