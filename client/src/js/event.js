var Event = function ( sender ) {
    this.sender = sender;
    this.listeners = [];
};

// 이벤트 등록
Event.prototype.observe = function ( listener ) {
    this.listeners.push( listener );
};

// 이벤트 발생
Event.prototype.notify = function ( args ) {
    var i = 0;
    for( i = 0; i < this.listeners.length; i++ ) {
        this.listeners[ i ]( this.sender, args );
    }
};