console.log('local data')
var data = [
                {
                    title: '微云',
                    id: 1,
                    pid: -1, // 虚拟的
                    type: 'dir'
                },
                {
                    title: '我的音乐',
                    id:1234,
                    pid: 1,
                    type: 'dir'
                },
                {
                    title: '我的文档',
                    id:55555,
                    pid: 1,
                    type: 'dir'
                },
                {
                    title: '我的电影',
                    id:7777,
                    pid: 1,
                    type: 'dir'
                },
                {
                    title: '周杰伦',
                    id:45789,
                    pid: 1234,
                    type: 'dir'
                },
                {
                    title: '发如雪',
                    id:6783211122,
                    pid: 45789,
                    type: 'mp3'
                },
                {
                    title: 'ss',
                    id:6783211188,
                    pid: 45789,
                    type: 'dir'
                },
                {
                    title: '菊花台',
                    id:780432454,
                    pid: 45789,
                    type: 'mp3'
                },
                {
                    title: '东风破',
                    id:678964333,
                    pid: 45789,
                    type: 'mp3'
                },
                {
                    title: '王杰',
                    id:678900,
                    pid: 1234,
                    type: 'dir'
                },
                {
                    title: '一场游戏一场梦',
                    id:689076544333,
                    pid: 678900,
                    type: 'mp3'
                },
                {
                    title: '我是真的爱上你',
                    id:6788999,
                    pid: 678900,
                    type: 'mp3'
                },
                {
                    title: '谢天笑',
                    id:5555789,
                    pid: 1234,
                    type: 'dir'
                },
                {
                    title: '向阳花',
                    id:6788888,
                    pid: 5555789,
                    type: 'jpg'
                },
                {
                    title: '不会改变',
                    id:67888878888888,
                    pid: 5555789,
                    type: 'png'
                },
                {
                    title: 'js文档',
                    id:6666788,
                    pid: 55555,
                    type: 'dir'
                },
                {
                    title: '科幻片',
                    id:6788124,
                    pid: 7777,
                    type: 'dir'
                },
                {
                    title: '喜剧片',
                    id:890124680,
                    pid: 7777,
                    type: 'dir'
                }
            ];

/*
    1. 根据id找到某个数据
    2. 根据id找所有的祖先数据
        根据ids集合，找每一个数据的所有祖先数据
    3. 根据id找所有的子孙数据
        根据ids集合，找每一个数据的所有子孙数据
    4. 根据id找子级 找 父级

    5. 根据指定id，判断指定的title，在不在同级中是否存在同名的title
    6. 根据指定id，判断指定的title，在不在子级中是否存在同名的title
    7. 指定id，在不在数据中


    8. 把指定id的数据替换掉 
    9. 把指定id的数据的title换掉 


    10. 根据id删除指定数据
    11.  根据id删除所有的子级
    12.  根据ids删除所有的子孙级
*/