<?php

namespace App\Enums;

/** Peran staf (dokumen 04 bagian 4, role_assignments.role). */
enum Role: string
{
    case SuperAdmin = 'super_admin';
    case ProgramAdmin = 'program_admin';
    case Researcher = 'researcher';
    case ResearcherPii = 'researcher_pii';
    case SchoolAdmin = 'school_admin';
    case Facilitator = 'facilitator';
    case Counselor = 'counselor';
    case Validator = 'validator';
    case ContentAuthor = 'content_author';
    case ContentReviewer = 'content_reviewer';
}
