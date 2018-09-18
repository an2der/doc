package me.phoibe.doc.cms.controller;

import me.phoibe.doc.cms.domain.dto.DPhoibeUser;
import me.phoibe.doc.cms.domain.dto.UserInfo;
import me.phoibe.doc.cms.domain.po.PageList;
import me.phoibe.doc.cms.domain.po.PageParam;
import me.phoibe.doc.cms.domain.po.PhoibeRole;
import me.phoibe.doc.cms.entity.Code;
import me.phoibe.doc.cms.entity.Result;
import me.phoibe.doc.cms.service.PhoibeUserService;
import me.phoibe.doc.cms.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/phoibe/user")
public class UserController {
    @Autowired
    private PhoibeUserService phoibeUserService;

    @GetMapping("/list/{index}/{limit}")
    public String list(@PathVariable Integer index, @PathVariable Integer limit,
                       @RequestParam(required = false) String f, @ModelAttribute UserInfo param){
        String orderBy = "CREATE_TIME";
        String sort = "DESC";
        PageParam<UserInfo> pageParam = new PageParam<>();
        pageParam.setStart(index * limit + 1);
        pageParam.setLimit(limit);
        pageParam.setParam(param == null ? new UserInfo() : param);
        pageParam.setOrderBy(orderBy);
        pageParam.setSort(sort);

        PageList<UserInfo> pageList = phoibeUserService.fetchUserPageList(pageParam);
        return JsonUtils.toJson(new Result<PageList<UserInfo>>(Code.SUCCESS, pageList));

    }

    @PostMapping("/save")
    public String save(@ModelAttribute DPhoibeUser dPhoibeUser){
        phoibeUserService.addUser(dPhoibeUser);
        return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
    }

    @GetMapping("/role/list")
    public String list(){
        List<PhoibeRole> list = phoibeUserService.fetchUserRoleList();
        return JsonUtils.toJson(new Result<List<PhoibeRole>>(Code.SUCCESS, list));
    }
}