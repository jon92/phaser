function create()
{
    var map = new Map();
    return map;
}

function Map()
{
    this.name = 'world';

    this.getName = function() {
        return this.name;
    }
}

exports.create = create;