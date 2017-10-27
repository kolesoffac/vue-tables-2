module.exports =  function(data) {
  this.data = this.applyFilters(data.data);
  this.count = parseInt(data.count);

  setTimeout(function(){
    this.dispatch('loaded',data);

     //----
    var tr = this.showBodyTable.querySelector("thead tr");

    this.showHeaderTable.querySelectorAll("th").forEach((th, index) => {
      tr.querySelector("th:nth-child(" + (index + 1) + ")").width = th.clientWidth;
    });
    //------
  }.bind(this),0);

}
