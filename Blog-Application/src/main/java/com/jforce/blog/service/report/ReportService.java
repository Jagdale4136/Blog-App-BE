package com.jforce.blog.service.report;

import com.jforce.blog.dto.reports.ActiveUserResponse;
import com.jforce.blog.dto.reports.PopularPostResponse;

import java.util.List;

public interface ReportService {
    List<ActiveUserResponse> getMostActiveUsers();

}
