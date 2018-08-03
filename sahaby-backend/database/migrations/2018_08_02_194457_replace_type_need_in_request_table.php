<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ReplaceTypeNeedInRequestTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('requests', function (Blueprint $table) {
            $table->dropForeign(['type_need_id']);
            $table->dropColumn('type_need_id');
            $table->integer('step_id')->unsigned()->nullable()->default(null);
            $table->foreign('step_id')
                  ->references('id')
                  ->on('steps')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('requests', function (Blueprint $table) {
            $table->integer('type_need_id')->unsigned()->nullable()->default(null);
            $table->foreign('type_need_id')
                  ->references('id')
                  ->on('type_needs')
                  ->onDelete('cascade');
        });
    }
}
