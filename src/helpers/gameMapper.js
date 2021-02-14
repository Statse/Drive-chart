function playTypeMapper(typeId) {
    switch(typeId) {
        case 0:
            return "Kickoff"
        break;
        case 1:
            return "Run"
        break;
        case 2:
            return "Pass"
        break;    
        case 3:
            return "Punt"
        break;    
        case 4:
            return "Field goal"
        break;    
        case 5:
            return "PAT"
        break;    
        case 6:
            return "2 point conversion"
        break;
        default:
            return ""
      }
}

function resultMapper(typeId) {
    switch(typeId) {
        case 0:
            return "Turnover"
        break;
        case 1:
            return "Run"
        break;
        case 2:
            return "Complete"
        break;    
        case 3:
            return "Incomplete"
        break;    
        case 4:
            return "Touchdown"
        break;    
        case 5:
            return "Fumble"
        break;    
        case 6:
            return "Fumble TD"
        break;
        case 7:
            return "Interception"
        break;
        case 8:
            return "Interception TD"
        break;   
        case 9:
            return "Sack"
        break;
        case 10:
            return "Safety"
        break;
        case 11:
            return "FG good"
        break;
        case 12:
            return "FG miss"
        break;
        case 13:
            return "PAT no good"
        break;
        case 14:
            return "2 pt conversion good"
        break;
        case 15:
            return "2 pt conversion good"
        break;
        case 16:
            return "Penalty"
        break;
        default:
            return ""
      }
}