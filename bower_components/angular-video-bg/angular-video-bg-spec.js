describe('video-bg directive', function() {

    beforeEach(module('angularVideoBg'));

    var scope, compile, timeout, videoBg, videoBgScope, $player, $content;

    beforeEach(inject(function($rootScope, $compile, $timeout) {
        scope = $rootScope.$new();
        compile = $compile;
        timeout = $timeout;

        videoBg = '<video-bg video-id="videoId" ratio="ratio" content-z-index="zIndex"><p>test</p></video-bg>';
        scope.videoId = 'M7lc1UVf-VE';
        videoBg = compile(videoBg)(scope);
        scope.$digest();

        $player = videoBg.children().eq(0);
        $content = videoBg.children().eq(1);
        videoBgScope = videoBg.isolateScope();
    }));

    it('should create a video player element', function() {
        expect($player.attr('id')).toBe('player-1');
    });

    it('should have correct video id', function() {
        expect(videoBgScope.videoId).toBe('M7lc1UVf-VE');
    });

    it('should create a content element', function() {
        expect($content).toBeDefined();
    });

    describe('content element', function() {

        it('should content the transcluded content', function() {
            expect($content.find('p').text()).toBe('test');
        });

    });

    describe('aspect ratio', function() {

        it('should be 16/9 by default', function() {
            expect(videoBgScope.ratio).toBe(16/9);
        });

        it('should be changed if ratio attribute is added', function() {
            scope.ratio = 4/3;
            scope.$digest();
            expect(videoBgScope.ratio).toBe(4/3);
        });

    });

});
