<?php

namespace App\Enums;

/** Cakupan peran, dari yang paling luas ke paling sempit. */
enum ScopeType: string
{
    case Platform = 'platform';
    case Organization = 'organization';
    case Program = 'program';
    case School = 'school';
    case Cohort = 'cohort';
    case SchoolClass = 'class';
}
