function fun(d) {
    const w = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var ans = {};
    for (const [key, value] of Object.entries(d)) {
      const date = new Date(key);
      const day = date.getDay();
      const weekDay = w[day];
      if (ans.hasOwnProperty(weekDay)) {
        let v = ans[weekDay];
        ans[weekDay] = v + value;
      } else {
        ans[weekDay] = value;
      }
    }
    for (let i = 0; i < w.length; i++) {
      if (!ans.hasOwnProperty(w[i])) {
        if (w[i].localeCompare("Tue") === 0) {
          let prevDay = ans["Mon"];
          let nextDay = null;
          for (let j = 3; j <= 6; j++) {
            if (ans.hasOwnProperty(w[j])) {
              nextDay = ans[w[j]];
              break;
            }
          }
          if (nextDay === null) nextDay = ans["Sun"];
          ans[w[i]] = (prevDay + nextDay) / 2;
        } else if (w[i].localeCompare("Sat") === 0) {
          let nextDay = ans["Sun"];
          let prevDay = null;
          for (let j = 5; j >= 0; j--) {
            if (ans.hasOwnProperty(w[j])) {
              prevDay = ans[w[j]];
  
              break;
            }
          }
          ans[w[i]] = (prevDay + nextDay) / 2;
        } else {
          let left = i - 1;
          let right = i + 1;
          let nextDay = null;
          let prevDay = null;
          while (left > 1 && right < 7) {
            if (ans.hasOwnProperty(w[left]) && ans.hasOwnProperty(w[right])) {
              nextDay = ans[w[right]];
              prevDay = ans[w[left]];
            }
            left--;
            right++;
          }
          if (left === 1 && prevDay === null && nextDay === null) {
            prevDay = ans["Mon"];
            for (let j = right; j <= 6; j++) {
              if (ans.hasOwnProperty(w[j])) {
                nextDay = ans[w[j]];
                break;
              }
            }
            if (nextDay === null) {
              nextDay = ans["Sun"];
            }
          } else if (right === 7) {
            nextDay = ans["Sun"];
            for (let j = left; j >= 0; j--) {
              if (ans.hasOwnProperty(w[j])) {
                prevDay = ans[w[j]];
                break;
              }
            }
          }
  
          ans[w[i]] = (prevDay + nextDay) / 2;
        }
      }
    }
    return ans;
  }
  var d = {
    "2020-01-01": 6,
    "2020-01-04": 12,
    "2020-01-05": 14,
    "2020-01-06": 2,
    "2020-01-07": 4,
  };
  console.log(fun(d));
  
