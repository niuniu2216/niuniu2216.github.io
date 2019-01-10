--跑道信息 计算出所有地图的路径和旋转角度
local trackManger = {}--class("trackManager",function() return cc.Node:create() end)

function leftOnLine(p1,p2,p)--点p在直线p1p2的左边-1
    local tmpx = (p1.x - p.x) * (p2.y - p.y) - (p1.y - p.y)*(p2.x - p.x)
    if (tmpx > 0) then
        return -1
    end
    return 1
end
function getTwoLinesAnge(p1,p2,p3,p4)--p1p2 p2p3 两条直线夹角
--    common.log("pre x="..p1.x..'  y='..p1.y..'  cur x='..p2.x..'  y='..p2.y..' next x='..p4.x..' y='..p4.y)
   local t1 = p2.x - p1.x
   local t2 = p2.y - p1.y
   local t3 = p4.x - p3.x
   local t4 = p4.y - p3.y
    local directionStatus = leftOnLine(p1,p2,p4)
   local num1=(t1*t3+t2*t4)/((math.sqrt(t1*t1+t2*t2))*(math.sqrt(t3*t3+t4*t4)))
    local acosvalue = 0
    if( num1 < 1) then
        acosvalue = math.acos(num1)
    end
   if(acosvalue == nan) then
        acosvalue = 0
   end
   local ange = acosvalue *180 / math.pi
   local returnValue = ange * directionStatus
--   common.log('--acosvalue='..acosvalue..'  ange='..ange..'  returnValue='..returnValue.."--getAnge="..' directionStatus='..directionStatus)
   return returnValue
end
--function trackManger:ctor()
--    self:initTrackInfo()
--end

function trackManger:initTrackInfo()--初始化
    self.trackMap = {}
    self:loadTMX()
    self:calcAllRotation()
end
function trackManger:loadTMX()--加载TMX路径文件 只读取数据
    local tmxPath = common.get_game_res_path("track/track.tmx")
    local trackTMXMap = cc.TMXTiledMap:create(tmxPath)
    local trackMapObejcts = trackTMXMap:getObjectGroups()
    
    local var
    for var=1 ,#trackMapObejcts do
        local objectGroup = trackMapObejcts[var]
        local name = objectGroup:getGroupName()
        local objects = objectGroup:getObjects()
--        table.sort(objects,function(object1,object2) return object1.name < object2.name end)
        self.trackMap[name] = nil
        self.trackMap[name] = objects
        common.log('----name='..name..' objects='..#objects)
    end
end

function trackManger:getTrackMapByName(name)
    if(self.trackMap[name] ~= nil) then
        return self.trackMap[name]
    end
    return 0
end

function trackManger:calcAllRotation()--计算map中点移动到下一个点的偏移量
    for name,runAllPoints in pairs(self.trackMap) do
        local curIndex = 1
        local preIndex = 0
        local nextIndex = 0
        for curIndex=1,#runAllPoints do
            preIndex = curIndex - 1
            if(preIndex <= 0) then
                preIndex = #runAllPoints
            end
            nextIndex = curIndex+1
            if(nextIndex > #runAllPoints) then
                nextIndex = 1
            end
            local prePoint = runAllPoints[preIndex]
            local curPoint = runAllPoints[curIndex]
            local nextPoint = runAllPoints[nextIndex]
            local rotation = getTwoLinesAnge(prePoint,curPoint,curPoint,nextPoint)
            runAllPoints[curIndex]['rotation'] = rotation
            common.log('--curIndex='..curIndex..' preIndex='..preIndex..' nextIndex='..nextIndex..' rotation='..rotation)
        end
        self.trackMap[name] = nil
        self.trackMap[name] = runAllPoints
    end
end
function trackManger:getCurTrackRunPoints()
    local nowTrack = hall.gamespace.userManager:getUserNowTrack()
    local nowTrackName = 'track'..nowTrack
    common.log('---getCurTrackRunPoints---'..nowTrackName)
    return self:getTrackMapByName(nowTrackName)
end
return trackManger