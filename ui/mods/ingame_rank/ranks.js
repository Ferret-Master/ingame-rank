

var script = document.createElement('script');
var script2 = document.createElement('script');
script.onload = function () {
    for(var i = 1; i < 6;i++){
        LeaderboardUtility.fetchLeagueInfo(i, "PAExpansion1:Ladder1v1").done(function(numberOfPlayersWithRank, players){
            _.map(players, function(player){
                if(player !== undefined){
                    _.delay(function(){
                        model.usernameRankMap[player.displayName()] = {
                            leaguePosition: player.leaguePosition,
                            league:model.returnLeagueBasedOnRating(player.rating)
                        }
                    },2000)
                   
                }
            })
        })
    }
};
script2.onload = function(){
    _.delay(function(){
        if(model.showPlayerListPanel() == false){
            return
        }
        else{
            
            _.delay(function(){addRanks()}, 1000)
        }
    },2000)
    
}
script.src = "coui://ui/main/shared/js/leaderboard_utility.js";
script2.src = "coui://ui/main/shared/js/matchmaking_utility.js";

document.head.appendChild(script)
document.head.appendChild(script2)

model.usernameRankMap = {}




// if(data.LeaguePosition == -1){player.rankedInfo().rank("Inactive")}
// 				else{player.rankedInfo().rank(data.LeaguePosition)}

// 				player.rankedInfo().leagueImage(MatchmakingUtility.getSmallBadgeURL(data.League));

// 				if(data.League == -1){data.League = 6}
// 				player.rankedInfo().badge(badges[data.League]);
// 				if(player.rankedInfo().rank() == 0){player.rankedInfo().rank("")}


//                 player.rankedInfo =  ko.observable(
//                     {
//                         "rank":ko.observable("inactive"),
//                         "badge":ko.observable("unranked"),
//                         "leagueImage":ko.observable("")
//                     }


model.returnLeagueBasedOnRating = function(rating){
    if(rating >= 2275){return 1}
    if(rating >= 2000){return 2}
    if(rating >= 1700){return 3}
    if(rating >= 1100){return 4}
    if(rating > 0){ return 5}
    return 6
}

var ranksAdded = false;

model.addBadge = ko.computed(function(){
    var playerPanelOpen = model.showPlayerListPanel()
    if(playerPanelOpen == false){return}
    if(model.players() == undefined){return}
    _.delay(function(){
       addRanks()
    },100)
})

function addRanks(){
    var playerCounter = 0;
    for( var i = 0; i< model.sortedPlayersArray().length;i++){
        for( var j = 0; j< model.sortedPlayersArray()[i].length;j++){
            var playerRankInfo = model.usernameRankMap[model.sortedPlayersArray()[i][j].name]
            if(playerRankInfo == undefined){playerCounter++;continue}
            var src = MatchmakingUtility.getSmallBadgeURL(playerRankInfo.league)
            $($(".div_player_name_status")[playerCounter]).after('<img style="margin-left: 10px" width="24px" height="20px" src='+src+' ><span>'+playerRankInfo.leaguePosition+'</span>')
            playerCounter++
        }
    }
}


