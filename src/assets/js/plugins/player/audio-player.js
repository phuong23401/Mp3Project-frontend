$(function () {
  ("use strict");

  $("#jquery_jplayer_1").jPlayer({
    swfPath: "js/plugins",
    cssSelectorAncestor: "#jp_container_1",
    supplied: "oga, mp3",
    wmode: "window",
  });

  $(document).on("click", ".btn_play", function () {
    const _this = $(this);

    const playlist = localStorage.getItem("playlist")
      ? JSON.parse(localStorage.getItem("playlist"))
      : [];

    const currentSong = localStorage.getItem("currentSong")
      ? JSON.parse(localStorage.getItem("currentSong"))
      : {
          id: 0,
          image: "",
          title: "",
          artist: "",
          mp3: "",
        };

    const mp3Url = currentSong.mp3;

    if (!_this.hasClass("is_playing")) {
      $(document).find(".btn_play").removeClass("is_playing");
      $(document).find(".btn_playlist").removeClass("is_playing");

      _this.addClass("is_playing");

      $("#jquery_jplayer_1").jPlayer("setMedia", {
        mp3: mp3Url,
      });
      $("#jquery_jplayer_1").jPlayer("play");
    } else {
      _this.removeClass("is_playing");
      $("#jquery_jplayer_1").jPlayer("pause");
    }

    $(".jp-now-playing").html(
      `<div class='jp-track-name'>
        <span class='que_img'>
          <img style="width: 50px; height: 50px; border-radius: 100%" src='${currentSong.image}'>
        </span>
        <div class='que_data'>
          ${currentSong.title}
          <div class='jp-artist-name'>${currentSong.artist}</div>
        </div>
      </div>`
    );
  });

  const myPlaylist = new jPlayerPlaylist(
    {
      jPlayer: "#jquery_jplayer_1",
      cssSelectorAncestor: "#jp_container_1",
    },
    [],
    {
      swfPath: "../dist/jplayer",
      supplied: "oga, mp3",
      wmode: "window",
      useStateClassSkin: true,
      autoBlur: false,
      smoothPlayBar: true,
      keyEnabled: true,
      playlistOptions: {
        autoPlay: true,
      }
    }
  );

  $(document).on("click", ".btn_playlist", function () {
    const _this = $(this);
    const playlist_id = _this.attr("data-playlist-id");

    if(playlist_id !== undefined) {
      $.get({
        url: `http://localhost:8080/home/getallsong/${playlist_id}`,
        success: function (response) {
          const playlist = response.map((s) => {
            return {
              ...s,
              title : s.name,
              image: s.avatarUrl, 
              mp3: s.fileUrl,
              artist: s.author,
            };
          });

          localStorage.setItem("playlist", JSON.stringify(playlist));

          if (!_this.hasClass("is_playing")) {
            $(document).find(".btn_playlist").removeClass("is_playing");
            $(document).find(".btn_play").removeClass("is_playing");
            _this.addClass("is_playing");

            myPlaylist.setPlaylist(playlist);
          } else {
            _this.removeClass("is_playing");
            myPlaylist.pause();
          }
        },
      });
    }
  });

  if ($(".audio-player").length) {

    $("#jquery_jplayer_1").on($.jPlayer.event.play, function (event) {
      if ($('.btn_playlist.is_playing').length) {
        const _playlist = localStorage.getItem("playlist") ? JSON.parse(localStorage.getItem("playlist")) : [];
        const current = myPlaylist.current

        $.each(_playlist, function (index, song) {
          if (index == current) {
            $(".jp-now-playing").html(
              `<div class='jp-track-name'>
                <span class='que_img'>
                  <img style="width: 50px; height: 50px; border-radius: 100%" src='${song.image}'>
                </span>
                <div class='que_data'>
                  ${song.title}
                  <div class='jp-artist-name'>${song.artist}</div>
                </div>
              </div>`
            );
          }
        });
      }

      $(".knob-wrapper")
        .mousedown(function () {
          $(window).mousemove(function (e) {
            var angle1 = getRotationDegrees($(".knob")),
              volume = angle1 / 270;

            if (volume > 1) {
              $("#jquery_jplayer_1").jPlayer("volume", 1);
            } else if (volume <= 0) {
              $("#jquery_jplayer_1").jPlayer("mute");
            } else {
              $("#jquery_jplayer_1").jPlayer("volume", volume);
              $("#jquery_jplayer_1").jPlayer("unmute");
            }
          });

          return false;
        })
        .mouseup(function () {
          $(window).unbind("mousemove");
        });

      function getRotationDegrees(obj) {
        var matrix =
          obj.css("-webkit-transform") ||
          obj.css("-moz-transform") ||
          obj.css("-ms-transform") ||
          obj.css("-o-transform") ||
          obj.css("transform");
        if (matrix !== "none") {
          var values = matrix.split("(")[1].split(")")[0].split(",");
          var a = values[0];
          var b = values[1];
          var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        } else {
          var angle = 0;
        }
        return angle < 0 ? angle + 360 : angle;
      }

      var timeDrag = false;
      $(".jp-play-bar").mousedown(function (e) {
        timeDrag = true;
        updatebar(e.pageX);
      });
      $(document).mouseup(function (e) {
        if (timeDrag) {
          timeDrag = false;
          updatebar(e.pageX);
        }
      });
      $(document).mousemove(function (e) {
        if (timeDrag) {
          updatebar(e.pageX);
        }
      });
      var updatebar = function (x) {
        var progress = $(".jp-progress");
        var position = x - progress.offset().left;
        var percentage = (100 * position) / progress.width();
        if (percentage > 100) {
          percentage = 100;
        }
        if (percentage < 0) {
          percentage = 0;
        }
        $("#jquery_jplayer_1").jPlayer("playHead", percentage);
        $(".jp-play-bar").css("width", percentage + "%");
      };
      $("#playlist-toggle, #playlist-text, #playlist-wrap li a")
        .unbind()
        .on("click", function () {
          $("#playlist-wrap").fadeToggle();
          $("#playlist-toggle, #playlist-text").toggleClass(
            "playlist-is-visible"
          );
        });
      $(".hide_player")
        .unbind()
        .on("click", function () {
          $(".audio-player").toggleClass("is_hidden");
          $(this).html(
            $(this).html() == '<i class="fa fa-angle-down"></i> HIDE'
              ? '<i class="fa fa-angle-up"></i> SHOW PLAYER'
              : '<i class="fa fa-angle-down"></i> HIDE'
          );
        });
      $("body")
        .unbind()
        .on("click", ".audio-play-btn", function () {
          $(".audio-play-btn").removeClass("is_playing");
          $(this).addClass("is_playing");
          var playlistId = $(this).data("playlist-id");
          myPlaylist.play(playlistId);
        });
    });
  }
});
