var array = [];
var passArray =[];
var accountData;
var endOfWeek;
var leader;
var filteredChips;
var postData;

//TINA
// var date = new Date();
// var lastClickedMS = date.setDate(1);



$(document).ready (function() {
  page.init();

});



var page = {

  accountUrl: 'http://tiy-fee-rest.herokuapp.com/collections/chips10',
  commentsUrl: 'http://tiy-fee-rest.herokuapp.com/collections/chip_comment2',

  init: function() {
    page.getAccounts();
    page.initEvents();

    page.getLeader();
    page.loadPosts();

    setInterval( function () {
      $.ajax({
        url: page.accountUrl,
        method: 'GET',
        success: function (data) {
          page.addAccountToDOM(data);
        },
        error: function (err) {

        }
      });

    } , 2000);

    setInterval( function () {
    page.getLeader();

  }, 2000);


  //   setInterval( function () {
  //     $.ajax({
  //       url: page.commentsUrl,
  //       method: 'GET',
  //         success: function (data) {
  //           var sortedPosts = _.sortBy(data, "dt");
  //           page.addAllPoststoDom(sortedPosts);
  //       },
  //         error: function (err) {
  //
  //       }
  //     });
  // },2000);

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
      page.loadAccount(); //insert function to add name & chip total to page;
      var inputUserName = $('input[name="user"]').val();
      var inputPassword = $('input[name="pass"]').val();

      _.each(accountData, function(el) {
        if (el.username === inputUserName && el.password === inputPassword) {
          $('.pageWrapper').addClass('hidden');
          $('.mainWrapper').removeClass('hidden');
        }
      });

    });

    $('.dropdown-menu').on('click', ".users", function(event) {
      event.preventDefault();
      var userAdded = $(this).html();
      console.log("I'm working");
      console.log(userAdded);
      $('.toWhom').html(userAdded);
    });



    $('.btn-group').on('click', ".clear", function(event) {
      $('.toWhom').html("To whom?");
    });

    $('.profile').on('click', ".btn-lg", function(event) {
      event.preventDefault();
      console.log("I'm working!");
      $('.pageWrapper').removeClass('hidden');
      $('.mainWrapper').addClass('hidden');
      $('input[name="user"]').val("");
      $('input[name="pass"]').val("");

    });

    $('.howMuch').on('click', ".sendChips", function(event) {
      event.preventDefault();
      console.log("I'm working!");
      var userSend = $('.toWhom').html()
      var userSendHashtag = "#" + $('.toWhom').html();
      var sendId = $(userSendHashtag).data('id');
      var chipAmountSend = Number($(userSendHashtag).attr('rel'));
      console.log(chipAmountSend);
      var username = $('#user').attr('name');
      var id = $('.templateWrapper').data('id');
      var chipAmount = Number($('input[name="betAmount"]').val());
      var senderChipTotal = Number($('.templateWrapper').attr('rel'));
      var description = $('input[name="betComment"]').val();
      page.removeChips(username, id, chipAmount, senderChipTotal);
      page.addChips(userSend, sendId, chipAmount, chipAmountSend);
      page.addPost(userSend, description, username, chipAmount);
      $('.mainContent').removeClass('hidden');
      $('.addForm').addClass('hidden');
    });

    $('.howMuch').on('click', '.sendChallenge', function(event){
      var userSend = $('.toWhom').html();
      var description = $('input[name="betComment"]').val();
      var username = $('#user').attr('name');
      var chipAmount = Number($('input[name="betAmount"]').val());
      var senderChipTotal = Number($('.templateWrapper').attr('rel'));
      if (senderChipTotal - chipAmount >= 0 && $('input[name="betAmount"]').val() !== "") {
        page.addChallenge(userSend, description, username, chipAmount);
      } else {
        alert("Get more coins!");
      }
      $('.mainContent').removeClass('hidden');
      $('.addForm').addClass('hidden');

    });

    $('.bigChip').on('click','.chipClick', function(event) {
      event.preventDefault();
      $('.addForm').removeClass('hidden');
      $('.mainContent').addClass('hidden');
    });

    $('.mainContent').on('click','.moreButton', function(event){
        event.preventDefault();
        var challenger = $(this).attr('name');
        var challengie = $(this).attr('rel');
        var chipTotal = $(this).attr('key');
        console.log("key: "+ chipTotal);
        console.log("challenger: " + challenger);
        console.log("challengie: " + challengie);
        var description = $(this).attr('value');
        console.log("description: " + description);
        page.challengeMore(challenger, challengie, chipTotal, description);
    });

  },

    //////////////////////
    // AJAX & FUNCTIONS //
    //////////////////////


      /////////////////////////
      // CHALLENGE FUNCTIONS //
      /////////////////////////

  challengeMore: function(challenged, challengy, chipTotes, descrip) {
    var challengeInfo = {
      challenger: challenged,
      challengie: challengy,
      chipTotal: chipTotes,
      description: descrip
    }

    page.postChallengeMore(challengeInfo);

  },

  postChallengeMore: function(challengeInfo) {
    page.loadMoreChallengeToPage("moreInfo", challengeInfo, $(".mainContentInfo"));
  },

  addChallenge: function(userSend, chipDescription, username, chipAmount) {
    var newChallenge = {
      challenger: username,
      challengie: userSend,
      chipTotal: chipAmount,
      description: chipDescription,
      dt: moment().format('MMMM Do, h:mm:ss a'),
      post: "challenge"
    }

    page.postChallenge(newChallenge);
  },

  addPost: function(userSend, chipDescription, username, chipAmount) {
    var newChallenge = {
      challenger: username,
      challengie: userSend,
      chipTotal: chipAmount,
      description: chipDescription,
      dt: moment().format('MMMM Do, h:mm:ss a'),
      post: "sent"
    }

    page.postSend(newChallenge);
  },

  postChallenge: function(newChallenge) {
    $.ajax({
      url: page.commentsUrl,
      method: 'POST',
      data: newChallenge,
      success: function (data) {
        console.log(data);
        page.addPosttoDom(data);
        console.log("success!!: added post", data);
      },
      error: function (err) {
        console.log("error ", err);
      }
    });
  },

  postSend: function(newChallenge) {
    $.ajax({
      url: page.commentsUrl,
      method: 'POST',
      data: newChallenge,
      success: function (data) {
        console.log(data);
        page.addSendPosttoDom(data);
        console.log("success!!: added post", data);
      },
      error: function (err) {
        console.log("error ", err);
      }
    });
  },

  loadPosts: function(event) {
    $.ajax({
        url: page.commentsUrl,
        method: 'GET',
        success: function (data) {
          var sortedPosts = _.sortBy(data, "dt");
          page.addAllPoststoDom(sortedPosts);
        },
        error: function (err) {

        }
      });
  },

  addAllPoststoDom: function (allPosts) {
    $('.mainContent').html("");
    _.each(allPosts, function (el) {
        if (el.post === "challenge") {
          page.addPosttoDom(el);
        } else {
          page.addSendPosttoDom(el);
        }
    });
  },

  addPosttoDom: function(post) {
    page.loadPostToPage("challengeReport", post, $('.mainContent'));
  },


  addSendPosttoDom: function(post) {
    page.loadPostToPage("sendReport", post, $('.mainContent'));
  },

  loadPostToPage: function (tmplName, data, $target) {
    var compiledTmpl = _.template(page.getTmpl(tmplName));
      $target.prepend(compiledTmpl(data));

    },

  loadMoreChallengeToPage: function (tmplName, data, $target) {
    var compiledTmpl = _.template(page.getTmpl(tmplName));
      $target.html(compiledTmpl(data));
    },




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


    getLeader: function(event) {
      $.ajax({
          url: page.accountUrl,
          method: 'GET',
          success: function (data) {
            leader = data.map(function(el){
               return { user: el.username, chips: Number(el.chipTotal) }
               page.loadLeaderToPage("leaderFeeder", post, $('#leaderASDF'));
            })
          leader = _.sortBy(leader,'chips').reverse();

          },
          error: function (err) {

          }
        });
      },


  addAccountToDOM: function (post) {
    page.loadAccountToPage("head", post, $('.headBox'));
    page.loadAccountToDropdown("dropDown", post, $('.dropdown-menu'));
    page.loadLeaderToPage("leaderFeeder", post, $('#leaderASDF'));
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
    }
    });
  },

  loadAccountToDropdown: function (tmplName, data, $target) {
    var compiledTmpl = _.template(page.getTmpl(tmplName));
    $('.dropdown-menu').html("");
    _.each(data, function (el){
      var userNameDrop = el.username
      $target.append(compiledTmpl(el));
    });
  },

  loadLeaderToPage: function (tmplName, data, $target){
    var compiledTmpl = _.template(page.getTmpl(tmplName));
    _.each(data, function(el){
      $('#leaderASDF').html("");
      var singleLeader = el.user
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

  addChips: function (userAdd, id, chipAmount, chipAmountSend) {
     var accountId = id;
     var chipCalculation = chipAmountSend + chipAmount;
     console.log(chipCalculation);
     var accountAdd = {
       username: userAdd,
       chipTotal: chipCalculation.toString()
     };
     page.chipAdd(accountAdd, accountId);
   },

  chipAdd: function (accountAdd, accountId) {

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
    var accountAdd = {
      username: userAdd,
      chipTotal: chipCalculation.toString()
    };
    page.chipRemove(accountAdd, accountId)
  },

  chipRemove: function (accountAdd, accountId) {

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
